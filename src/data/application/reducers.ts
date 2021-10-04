import { createReducer } from "@reduxjs/toolkit";
import { setMarketId, setMarkets, setAppConnected } from "./actions";
import { DEFAULT_MARKET_ID } from "../constants";

interface Data {
  [key: string]: any;
}

export interface Markets {
  name: string;
  state: string;
  data: Data;
}

export interface ApplicationState {
  marketId: string;
  markets: Markets | undefined;
  appConnected: boolean;
}

const initialState: ApplicationState = {
  marketId: DEFAULT_MARKET_ID,
  markets: undefined,
  appConnected: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setMarketId, (state, action) => {
      state.marketId = action.payload.marketId;
    })
    .addCase(setMarkets, (state, action) => {
      state.markets = action.payload.markets;
    })
    .addCase(setAppConnected, (state, action) => {
      state.appConnected = action.payload.appConnected;
    })
);
