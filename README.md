# VegaMex

A minimalistic dashboard exploring Vega API and GraphQL in a React typescript app.

![vegaMex dashboard](/public/img/dashboard.png)

## Get started

1. Clone this repository
2. Run `npm install` or `yarn` inside the root folder
3. Run `npm start` or `yarn start` to start the server.

If everything goes well your app should be running on [http://localhost:3000](http://localhost:3000)

## Quick links

- [Live demo](https://vegamex.netlify.app/)
- [Project Walkthrough](/WALKTHROUGH.md)
- [Vega API reference](https://docs.fairground.vega.xyz/docs/api-reference/)
- [Vega Graphql schema documentation](https://docs.fairground.vega.xyz/api/graphql/)

## Project coverage

- [x] Listing markets and market data (show market status)
- [x] Straming orders and trades
- [x] Party (trader) information for a given public key, including account balances and positions
- [ ] Prepare and place an order on a market
- [x] Streaming of events
- [x] Governance proposals

## Todo

- [ ] Add stylings
- [ ] Make the app themeable
- [ ] Add localization
- [ ] Stream candles (for charting)
- [ ] Write a more indepth step by step guild (docs and video gulde)
- [ ] Add transaction signing capabilities
- [ ] Make the app more responsive across all device
