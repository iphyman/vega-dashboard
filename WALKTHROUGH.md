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

```graphql
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

```gql
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

```gql
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
