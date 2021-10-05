# Getting Started with Vega Graphql API in React based project

At the end of this tutorial, you should be able to connect to [Vega](https://vega.xyz) GraphQl API from your react app and consume as much data as you want.
A more indepth guilde can be found on [Vega documentation website](https://docs.fairground.vega.xyz/)

## Setup

Let's get started by creating a new react app.

```
npx create-react-app my-app
cd my-app
npm start or yarn start
```

If you already have an existing react project, just open your project in a terminal to continue with the rest of the tutorial.

## Install Dependencies

To make request and receive response from [Vega GraphQL API](https://vega.xyz) we need to install the following packages.

- @apollo/client
- graphql

Run below command on your terminal to install

```
npm install @apollo/client graphql
or
yarn add @apollo/client graphql
```

## Initialize apollo client with Vega Graphql URL

Create a file named client.js and populate with below code

```javascript
import { ApolloClient, InMemoryCache } from "@apollo/client";

const VEGA_GRAPHQL_API = "https://lb.testnet.vega.xyz/query";

export const client = new ApolloClient({
  uri: VEGA_GRAPHQL_API,
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
```

## Wrap your app with ApolloProvider

The reason for this, is to expose all your components under this provider to the Vega graphql data.

```javascript
...other imports
import { client } from "./client";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    /** ...other components **/
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Getting all markets

In this demo we want to fetch the following data about all markets available in [Vega](https://vega.xyz). If you need more details about the market, you can check [Vega Docs](https://docs.fairground.vega.xyz/api/graphql/market.doc.html).

- market ID
- market short name
- market state

Now we define our graphql query to get just the data that we need.

```javascript
const GET_MARKETS = gql`
  query GetMarkets {
    markets {
      id
      state
      tradableInstrument {
        instrument {
          code
        }
      }
    }
  }
`;
```

You can also test this query in [Vega Graphql Playground](https://lb.testnet.vega.xyz/playground), copy the above code without "query GetMarkets" label.
In our market navbar component we use this data to create a market navigation

```javascript
import { useQuery, gql } from "@apollo/client";
...other imports

export function Navbar() {
  const { loading, error, data } = useQuery(GET_MARKETS);

  if (loading) return <Loading />;

  if (error) return <Loading error={error.message} />;

  return (
    <NavbarWrapper>
      <Container>
        <Row>
          <Slider
            rightIcon={<BsChevronDoubleRight />}
            leftIcon={<BsChevronDoubleLeft />}
          >
            {data?.markets.map((market, index) => (
              <NavItem
                key={index}
                title={market?.tradableInstrument?.instrument?.code}
                subtitle={market?.state}
                to={market?.id}
              />
            ))}
          </Slider>
        </Row>
      </Container>
    </NavbarWrapper>
  );
}
```

## Using Market Data

We are going to query Vega graphql API to get data for a specific market, to do this we need to have a valid market id which we can obtain by quering the API for all markets.

```javascript
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
```

Create the component to consume the data returned

```javascript
import { useQuery, gql } from "@apollo/client";

export function MarketInfo() {
  const marketId = "";

  const { loading, error, data } = useQuery(GET_MARKET_DATA, {
    variables: { marketId },
  });

  if (loading) return <Loading />; //Loading...

  if (error) return <Loading error={error.message} />; //Error occured

  console.log(data); //Response object
}
```

## Governance Proposal

We want to fetch all governance proposal on new market

```javascript
const GET_PROPOSALS = gql`
  query GetProposals {
    proposals {
      state
      votes {
        yes {
          totalNumber
        }
        no {
          totalNumber
        }
      }
      rejectionReason
      terms {
        enactmentDatetime
        closingDatetime
        change {
          ... on NewMarket {
            instrument {
              name
              code
            }
          }
        }
      }
    }
  }
`;
```

To find out more data available on the this endpoint please visit [Vega Graphql docs](https://docs.fairground.vega.xyz/api/graphql/proposal.doc.html)
After writing the graphql query it's time to make a simple table to consume the fetched response.

```javascript
import { useQuery, gql } from "@apollo/client";
...other imports

export function Proposal() {
  const { loading, data, error } = useQuery(GET_PROPOSALS);

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const proposals = data?.proposals;

  return (
    <table>
      <thead>
        <tr>
          <th>Proposal</th>
          <th>Status</th>
          <th>Enactment date</th>
          <th>Votes Yes/No</th>
          <th>Closing date</th>
          <th>Rejection reason</th>
        </tr>
      </thead>
      <tbody>
        {proposals?.map((proposal: any, index: number) => (
          <tr key={index}>
            <td>New Market: {proposal?.terms?.change?.instrument?.code}</td>
            <td>{proposal?.state}</td>
            <td>
              {dayjs(proposal?.terms?.enactmentDatetime).format(
                "YYYY MM DD HH:MM"
              )}
            </td>
            <td>
              {proposal?.votes?.yes?.totalNumber}/
              {proposal?.votes?.no?.totalNumber}
            </td>
            <td>
              {dayjs(proposal?.terms?.closingDatetime).format(
                "YYYY MM DD HH:MM"
              )}
            </td>
            <td>{proposal?.rejectionReason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

We are formating the date with dayjs run `npm install dayjs` to add to your project.

## Get Party Positions

```javascript
const GET_PARTY_POSITIONS = gql`
  query GetPartyPositions($partyID: ID) {
    party(id: $partyID) {
      positions {
        unrealisedPNL
        openVolume
        realisedPNL
        averageEntryPrice
        margins {
          maintenanceLevel
        }
        market {
          tradableInstrument {
            instrument {
              code
            }
          }
        }
      }
    }
  }
`;
```

To get the party(user) positions we need to supply the user partyId to the query. In this demo the partyId is saved in .env file.

```javascript
const partyID = process.env.REACT_APP_WALLET_PUBLIC_KEY;
// const partyID =
//   "79042cbcff5afd0d50c177870a151d59c0f87bea70614570301047d192f9cfc5";

export function Positions() {
  const { loading, data, error } = useQuery(GET_PARTY_POSITIONS, {
    variables: { partyID },
  });

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const positions = data?.party?.positions;

  const decimals = 5;

  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Entry price</th>
          <th>Maintenance margin</th>
          <th>Unrealised PNL</th>
          <th>Realised PNL</th>
          <th>Open vol</th>
        </tr>
      </thead>
      <tbody>
        {positions?.map((position: any, index: number) => (
          <tr key={index}>
            <td>{position?.market?.tradableInstrument?.instrument?.code}</td>
            <td>{formatDecimal(position?.averageEntryPrice)}</td>
            <td>{position?.margins?.maintenanceLevel}</td>
            <td>{formatDecimal(position?.unrealisedPNL)}</td>
            <td>{formatDecimal(position?.realisedPNL)}</td>
            <td>{position?.openVolume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Streaming Orders

Let's create a live order book component for our application, in our order book we want the following data displayed.

- Price
- Size
- Side (Buy or Sell)
- Decimal place (help in converting to actual value, default is 5)

We now proceed to write a graphql query to get just the data we need. For more details on what data can be returned by this query endpoint check [Vega Schema Docs](https://docs.fairground.vega.xyz/api/graphql/order.doc.html).

```javascript
const STREAM_ORDERS = gql`
  subscription OnNewOrders($marketId: ID) {
    orders(marketId: $marketId) {
      size
      side
      price
      market {
        decimalPlaces
      }
    }
  }
`;
```

```javascript
import { useSubscription, gql } from "@apollo/client";
/**
 *  <Route path="/trade/:marketId"/>
 *  We are getting and data passed after the trade path as our marketId
 **/
import { useParams } from "react-router-dom";

export function OrderBook() {
  const { marketId } = useParams<{ marketId: string }>()
  const { loading, data, error } = useSubscription(STREAM_ORDERS, {
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
    <table>
      <thead>
        <tr>
          <th>Price</th>
          <th>Size</th>
          <th>Side</th>
        </tr>
      </thead>
      <tbody>
        {data?.orders.map((order: any, index: number) => (
          <tr key={index} data-side={order?.side}>
            <td>{formatDecimal(order?.price)}</td>
            <td>{order?.size}</td>
            <td>{order?.side}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

```

In our above component we are fetching the active marketId from the current route parameter. This will allow us to easily load a new market when the url changes.

## Streaming Trades

Our recent trade streaming component is much similar to the order streaming component above, only that we are making changes to the query and destructuring of the response object.
The data we need displayed for this component are;

- Price
- Size
- Aggressor (Buy or Sell)

Let's go ahead to write our query.

```javascript
const STREAM_TRADES = gql`
  subscription OnNewTrade($marketId: ID) {
    trades(marketId: $marketId) {
      size
      price
      aggressor
    }
  }
`;
```
Let's go ahead to create our component jsx
```javascript
  export function RecentTrades() {
  const defaultMarketId = useActiveMarketId();
  const { marketId } = useParams<{ marketId: string }>() ?? defaultMarketId;
  const { loading, data, error } = useSubscription(STREAM_TRADES, {
    variables: { marketId },
  });

  if (loading) return <Loading />;

  if (error) return <DisConnected error={error.message} />;

  const decimals = 5;
  /**
   *
   * All currency in Vega are padded
   * so to get the real value we multiply 10^-decimals
   **/
  function formatDecimal(amount: number) {
    amount = amount * 10 ** -decimals;
    return numeral(amount).format();
  }

  return (
    <table>
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
    </table>
  );
}
```
