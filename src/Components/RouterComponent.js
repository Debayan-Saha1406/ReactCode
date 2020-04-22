import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./LoginComponent";
import Admin from "./AdminComponent";
import User from "./UserComponent";
import ForgotPassword from "./ForgotPassword";
import Register from "./RegisterComponent";
import ResetPassword from "./ResetPasswordComponent";
import MovieHomePage from "./MovieReview/MovieHome/MovieHomePage";
import MovieGrid from "./MovieReview/MovieGrid/MovieGrid";
import MovieSingleHomePage from "./MovieReview/MovieSingle/MovieSingleHomePage";
import MovieList from "./MovieReview/MovieList/MovieList";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/admin/Users"
            render={() => <Admin subRoute={"Users"} />}
          />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/register" component={Register} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/movie" component={MovieHomePage} />
          <Route path="/movie-grid" component={MovieGrid} />
          <Route path="/movie-single" component={MovieSingleHomePage} />
          <Route path="/movie-list" component={MovieList} />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
