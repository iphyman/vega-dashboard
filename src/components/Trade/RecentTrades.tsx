import { useSubscription, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import { useActiveMarketId } from "../../data/application/hooks";
import { Loading, DisConnected } from "../Loaders";
import DataTable from "components/DataTable";

numeral.defaultFormat("0,0");

const STREAM_TRADES = gql`
  subscription OnNewTrade($marketId: ID) {
    trades(marketId: $marketId) {
      size
      price
      aggressor
    }
  }
`;

export function RecentTrades() {
  const defaultMarketId = useActiveMarketId();
  const { marketId } = useParams<{ marketId: string }>() ?? defaultMarketId;
  const { loading, data, error } = useSubscription(STREAM_TRADES, {
    variables: { marketId },
  });

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const decimals = 5;

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <DataTable>
      <thead>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Side</th>
        </tr>
      </thead>
      <tbody>
        {data?.trades.map((trade: any, index: number) => (
          <tr key={index} data-side={trade?.aggressor}>
            <td>{formatDecimal(trade?.price)}</td>
            <td>{trade?.size}</td>
            <td>{trade?.aggressor}</td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
