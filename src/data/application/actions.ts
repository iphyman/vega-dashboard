import { createAction } from "@reduxjs/toolkit";
import { Markets } from "./reducers";

export const setMarketId =
  createAction<{ marketId: string }>("market/marketId");

export const setMarkets = createAction<{ markets: Markets }>("market/markets");

export const setAppConnected = createAction<{ appConnected: boolean }>(
  "graphql/appConnected"
);
