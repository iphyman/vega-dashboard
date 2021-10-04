import { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Trade from "../pages/trade";

export default class Routes extends PureComponent {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/trade/:marketId" component={Trade} />
        </Switch>
      </>
    );
  }
}
