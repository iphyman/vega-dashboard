import { PureComponent } from "react";
import { Routes, Route } from "react-router-dom";
import Trade from "../pages/trade";
export default class AppRoutes extends PureComponent {
  render() {
    return (
      <Routes>
        <Route path="trade">
          <Route path=":marketId" element={<Trade />} />
        </Route>
        <Route path="*" element={<Trade />} />
      </Routes>
    );
  }
}
