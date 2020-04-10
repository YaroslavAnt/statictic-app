import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./styles/index.scss";
import Charts from "./Pages/Charts";
import Stats from "./Pages/Stats";
import Main from "./Pages/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";

const routes = (
  <Switch>
    <Route path="/users/:id" component={Charts} />
    <Route path="/users" component={Stats} />
    <Route path="/" exact component={Main} />
  </Switch>
);

function App({ location }) {
  return (
    <div className="layout">
      <Header isTransparent={location.pathname === "/"} />
      {routes}
      <Footer isTransparent={location.pathname === "/"} />
    </div>
  );
}

export default withRouter(App);
