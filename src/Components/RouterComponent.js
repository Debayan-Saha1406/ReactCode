import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./LoginComponent";
import Admin from "./AdminComponent";
import User from "./UserComponent";
import ForgotPassword from "./ForgotPassword";
import Register from "./RegisterComponent";
import ResetPassword from "./ResetPasswordComponent";
import MovieHomePage from "./MovieReview/MovieHome/MovieHomePage";
import Movies from "./MovieReview/Movies/Movies";
import MovieDetails from "./MovieReview/MovieDetails/MovieDetails";
import NotFound from "./MovieReview/Common/NotFound";

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
          <Route path="/home" component={MovieHomePage} />
          <Route path="/movie-details/:name" component={MovieDetails} />
          <Route path="/movies" component={Movies} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
