import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store";
import { setMarketId, setMarkets, setAppConnected } from "./actions";
import { Markets } from "./reducers";

export function useActiveMarketData() {
  return useSelector((state: RootState) => state.app.markets);
}

export function useActiveMarketId() {
  return useSelector((state: RootState) => state.app.marketId);
}

export function useAppConnected() {
  return useSelector((state: RootState) => state.app.appConnected);
}

export function useSetMarketId() {
  const dispatch = useDispatch<RootDispatch>();
  // const activeMarketId = useActiveMarketId();

  const setActiveMarketId = useCallback(
    (marketID: string) => {
      dispatch(setMarketId({ marketId: marketID }));
    },

    [dispatch]
  );

  return [setActiveMarketId];
}

export function useSetMarketData() {
  const dispatch = useDispatch<RootDispatch>();

  return useCallback(
    (markets: Markets) => {
      dispatch(setMarkets({ markets: markets }));
    },

    [dispatch]
  );
}

export function useSetAppConnected() {
  const dispatch = useDispatch<RootDispatch>();
  const connectionStatus = useAppConnected();

  return useCallback(() => {
    dispatch(setAppConnected({ appConnected: !connectionStatus }));
  }, [dispatch]);
}
