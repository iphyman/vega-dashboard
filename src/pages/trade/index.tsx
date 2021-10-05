import { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Layout from "layouts";
import Panel from "components/Panel";
import { RecentTrades } from "components/Trade";
import { OrderBook } from "components/Order";
import { Positions } from "components/Position";
import { Balance } from "components/Balance";
import { Proposal } from "components/Proposal";
import {
  TRADE_GRID_LAYOUTS,
  TRADE_lAYOUT_BREAKPOINTS,
  TRADE_lAYOUT_COLUMNS,
} from "data/constants";
import "react-grid-layout/css/styles.css";

const ResponsiveGrid = WidthProvider(Responsive);
export default class Trade extends Component {
  render() {
    return (
      <Layout>
        <ResponsiveGrid
          className="layout"
          layouts={TRADE_GRID_LAYOUTS}
          breakpoints={TRADE_lAYOUT_BREAKPOINTS}
          cols={TRADE_lAYOUT_COLUMNS}
          containerPadding={[0, 0]}
          draggableHandle=".MyDragHandler"
          resizeHandles={["se"]}
        >
          <Panel key="orderBook" title="Orderbook">
            <OrderBook />
          </Panel>
          <Panel key="recentTrade" title="Recent trades">
            <RecentTrades />
          </Panel>
          <Panel key="openOrders" title="Postions">
            <Positions />
          </Panel>
          <Panel key="depthChart" title="Active Market Balances">
            <Balance />
          </Panel>
          <Panel key="positions" title="Governance Proposals">
            <Proposal />
          </Panel>
          <Panel key="chart" title="Place Order">
            Coming soon...
          </Panel>
        </ResponsiveGrid>
      </Layout>
    );
  }
}
