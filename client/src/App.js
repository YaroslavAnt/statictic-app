import React from "react";
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";

import "./styles/index.scss";
import ChartsHoc from "./Pages/Charts";
import StatsHoc from "./Pages/Stats";
import Main from "./Pages/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";

const routes = (
  <Switch>
    <Route path="/charts" component={ChartsHoc} />
    <Route path="/stats" component={StatsHoc} />
    <Route path="/" exact component={Main} />
  </Switch>
);

function App({ match }) {
  return (
    <>
      <Header isTransparent={match.path === "/"} />
      {routes}
      <Footer isTransparent={match.path === "/"} />
    </>
  );
}

export default withRouter(App);
