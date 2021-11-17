import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { useQuery, gql } from "@apollo/client";
import { useActiveMarketId } from "data/application/hooks";
import { Loading } from "components/Loaders";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import numeral from "numeral";

numeral.defaultFormat("0,0.00");
dayjs.extend(relativeTime);

const GET_MARKET_DATA = gql`
  query GetMarketData($marketId: ID!) {
    market(id: $marketId) {
      id
      name
      state
      tradingMode
      decimalPlaces
      fees {
        factors {
          makerFee
          infrastructureFee
          liquidityFee
        }
      }
      data {
        midPrice
        markPrice
        auctionEnd
        openInterest
        bestBidPrice
        bestBidVolume
        bestOfferPrice
        bestOfferVolume
        bestStaticBidPrice
        bestStaticBidVolume
        bestStaticOfferPrice
        bestStaticOfferVolume
        priceMonitoringBounds {
          minValidPrice
          maxValidPrice
          referencePrice
          trigger {
            probability
            auctionExtensionSecs
            horizonSecs
          }
        }
      }
      tradableInstrument {
        instrument {
          code
          name
          metadata {
            tags
          }
          product {
            ... on Future {
              quoteName
              maturity
              settlementAsset {
                symbol
                name
              }
            }
          }
        }
        riskModel {
          ... on LogNormalRiskModel {
            riskAversionParameter
            tau
            params {
              mu
              r
              sigma
            }
          }
        }
      }
      priceMonitoringSettings {
        updateFrequencySecs
        parameters {
          triggers {
            probability
            horizonSecs
            auctionExtensionSecs
          }
        }
      }
      liquidityMonitoringParameters {
        triggeringRatio
        targetStakeParameters {
          scalingFactor
        }
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  & > tbody tr {
    &:hover {
      background-color: #4e524e;
      cursor: pointer;
    }
    & > th {
      color: #8a9ba8;
      text-align: left;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.3;
    }
    & > td {
      color: #ffffff;
      text-align: right;
      font-size: 12px;
      font-weight: normal;
      line-height: 1.2;
      white-space: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
  }
`;

export function MarketInfo() {
  const defaultMarketId = useActiveMarketId();
  let { marketId } = useParams();

  if (!marketId) {
    marketId = defaultMarketId;
  }

  const { loading, error, data } = useQuery(GET_MARKET_DATA, {
    variables: { marketId },
  });

  if (loading) return <Loading />;

  if (error) return <Loading error={error.message} />;

  const response = data?.market;
  const marketData = response?.data;
  const fees = response?.fees?.factors;
  const lqdty = response?.liquidityMonitoringParameters;
  const priceMonTriggers = marketData?.priceMonitoringBounds;
  const { tags } = response?.tradableInstrument?.instrument?.metadata;
  const decimals = response?.decimalPlaces;

  function formatHorizon(seconds: number) {
    if (seconds >= 86400) {
      return `${numeral(seconds).format("0,0")} (~${seconds / 86400} days)`;
    }
    if (seconds >= 3600) {
      return `${numeral(seconds).format("0,0")} (~${seconds / 3600} hours)`;
    }
    if (seconds <= 60) {
      return `${numeral(seconds).format("0,0")} (~${seconds} seconds)`;
    }
    if (seconds <= 3600) {
      return `${numeral(seconds).format("0,0")} (~${seconds / 60} minutes)`;
    }
  }

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <Container>
      <Title>Active Market Data</Title>
      <Table>
        <tbody>
          <tr>
            <th>Action Ends</th>
            <td>{dayjs(marketData?.auctionEnd).fromNow()}</td>
          </tr>
          <tr>
            <th>Best bid</th>
            <td>{formatDecimal(marketData?.bestBidPrice)}</td>
          </tr>
          <tr>
            <th>Best bid vol</th>
            <td>{numeral(marketData?.bestBidVolume).format("0,0")}</td>
          </tr>
          <tr>
            <th>Best ask</th>
            <td>{formatDecimal(marketData?.bestOfferPrice)}</td>
          </tr>
          <tr>
            <th>Best ask vol</th>
            <td>{numeral(marketData?.bestOfferVolume).format("0,0")}</td>
          </tr>
          <tr>
            <th>Mark price</th>
            <td>{formatDecimal(marketData?.markPrice)}</td>
          </tr>
          <tr>
            <th>Mid price</th>
            <td>{formatDecimal(marketData?.midPrice)}</td>
          </tr>
          <tr>
            <th>Best static bid</th>
            <td>{formatDecimal(marketData?.bestStaticBidPrice)}</td>
          </tr>
          <tr>
            <th>Best static bid vol</th>
            <td>{numeral(marketData?.bestStaticBidVolume).format("0,0")}</td>
          </tr>
          <tr>
            <th>Best static ask</th>
            <td>{formatDecimal(marketData?.bestStaticOfferPrice)}</td>
          </tr>
          <tr>
            <th>Best static ask vol</th>
            <td>{numeral(marketData?.bestStaticOfferVolume).format("0,0")}</td>
          </tr>
          <tr>
            <th>Open interest</th>
            <td>{numeral(marketData?.openInterest).format("0,0")}</td>
          </tr>
        </tbody>
      </Table>
      <Title>Current fees</Title>
      <Table>
        <tbody>
          <tr>
            <th>Infrastructure fee</th>
            <td>{numeral(fees?.infrastructureFee).format("0.00%")}</td>
          </tr>
          <tr>
            <th>Maker fee</th>
            <td>{numeral(fees?.makerFee).format("0.00%")}</td>
          </tr>
          <tr>
            <th>Liquidity provision fee</th>
            <td>{numeral(fees?.liquidityFee).format("0.00%")}</td>
          </tr>
          <tr>
            <th>Total fee</th>
            <td>
              {numeral(fees?.infrastructureFee)
                .add(fees?.makerFee)
                .add(fees?.liquidityFee)
                .format("0.00%")}
            </td>
          </tr>
        </tbody>
      </Table>
      <Title>Price monitoring triggers</Title>
      {priceMonTriggers.map((item: any, index: any) => (
        <Table key={index}>
          <tbody>
            <tr>
              <th>Time horizon</th>
              <td>{formatHorizon(item?.trigger?.horizonSecs)}</td>
            </tr>
            <tr>
              <th>Probability</th>
              <td>{item?.trigger?.probability}</td>
            </tr>
            <tr>
              <th>Reference price</th>
              <td>{formatDecimal(item?.referencePrice)}</td>
            </tr>
            <tr>
              <th>Minimum valid price</th>
              <td>{formatDecimal(item?.minValidPrice)}</td>
            </tr>
            <tr>
              <th>Maximum valid price</th>
              <td>{formatDecimal(item?.maxValidPrice)}</td>
            </tr>
            <tr>
              <th>Auction extension</th>
              <td>{formatHorizon(item?.trigger?.auctionExtensionSecs)}</td>
            </tr>
          </tbody>
        </Table>
      ))}
      <Title>Market Details</Title>
      <Table>
        <tbody>
          <tr>
            <th>Short name</th>
            <td>{response?.tradableInstrument?.instrument?.code}</td>
          </tr>
          <tr>
            <th>Full name</th>
            <td>{response?.name}</td>
          </tr>
          <tr>
            <th>Market status</th>
            <td>{response?.state}</td>
          </tr>
          <tr>
            <th>Vega market ID</th>
            <td>{response?.id}</td>
          </tr>
          <tr>
            <th>Trading mode</th>
            <td>{response?.tradingMode}</td>
          </tr>
          <tr>
            <th>Tick size</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Quote decimal places</th>
            <td>{response?.decimalPlaces}dp</td>
          </tr>
          <tr>
            <th>Tags</th>
            <td>
              {tags?.map((item: any, index: any) => (
                <div key={index}>{item}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
      <Title>Instrument</Title>
      <Table>
        <tbody>
          <tr>
            <th>Vega instrument code</th>
            <td>{response?.tradableInstrument?.instrument?.code}</td>
          </tr>
          <tr>
            <th>Product type</th>
            <td>Future</td>
          </tr>
          <tr>
            <th>Quote unit</th>
            <td>
              {response?.tradableInstrument?.instrument?.product?.quoteName}
            </td>
          </tr>
          <tr>
            <th>Settlement asset</th>
            <td>
              {
                response?.tradableInstrument?.instrument?.product
                  ?.settlementAsset?.name
              }
            </td>
          </tr>
          <tr>
            <th>Maturity</th>
            <td>
              {dayjs(
                response?.tradableInstrument?.instrument?.product?.maturity
              ).format("YYYY MM DD HH:MM")}
            </td>
          </tr>
        </tbody>
      </Table>
      <Title>Risk model</Title>
      <Table>
        <tbody>
          <tr>
            <th>Risk aversion lambda</th>
            <td>
              {response?.tradableInstrument?.riskModel?.riskAversionParameter}
            </td>
          </tr>
          <tr>
            <th>Tau</th>
            <td>{response?.tradableInstrument?.riskModel?.tau}</td>
          </tr>
          <tr>
            <th>Growth Mu</th>
            <td>{response?.tradableInstrument?.riskModel?.params?.mu}</td>
          </tr>
          <tr>
            <th>Risk free rate</th>
            <td>{response?.tradableInstrument?.riskModel?.params?.r}</td>
          </tr>
          <tr>
            <th>Volatility sigma</th>
            <td>{response?.tradableInstrument?.riskModel?.params?.sigma}</td>
          </tr>
        </tbody>
      </Table>
      <Title>Price monitoring settings</Title>
      <Table>
        <tbody>
          <tr>
            <th>Update frequency</th>
            <td>
              {response?.priceMonitoringSettings?.updateFrequencySecs} seconds
            </td>
          </tr>
        </tbody>
      </Table>
      {response?.priceMonitoringSettings?.parameter?.triggers.map(
        (item: any, index: any) => (
          <Table key={index}>
            <tbody>
              <tr>
                <th>Auction extension</th>
                <td>{formatHorizon(item?.auctionExtensionSecs)}</td>
              </tr>
              <tr>
                <th>Time horizon</th>
                <td>{formatHorizon(item?.horizonSecs)}</td>
              </tr>
              <tr>
                <th>Probability</th>
                <td>{item?.probability}</td>
              </tr>
            </tbody>
          </Table>
        )
      )}
      <Title>Liquidity</Title>
      <Table>
        <tbody>
          <tr>
            <th>Triggering ratio</th>
            <td>{lqdty?.triggeringRatio} seconds</td>
          </tr>
          <tr>
            <th>Scaling factor</th>
            <td>{lqdty?.targetStakeParameters?.scalingFactor}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
