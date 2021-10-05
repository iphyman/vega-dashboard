import { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Trade from "../pages/trade";
import { DEFAULT_MARKET_ID } from "data/constants";

export default class Routes extends PureComponent {
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`/trade/${DEFAULT_MARKET_ID}`} />}
          />
          <Route
            exact
            path="/trade"
            render={() => <Redirect to={`/trade/${DEFAULT_MARKET_ID}`} />}
          />
          <Route exact path="/trade/:marketId" component={Trade} />
        </Switch>
      </>
    );
  }
}
