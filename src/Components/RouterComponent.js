import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./LoginComponent";
import Admin from "./AdminComponent";
import User from "./UserComponent";
import ForgotPassword from "./ForgotPassword";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
