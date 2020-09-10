import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Login from "./LoginComponent";
import Admin from "./AdminComponent";
import User from "./UserComponent";
import Register from "./RegisterComponent";
import ResetPassword from "./ResetPasswordComponent";
import Movies from "../MovieReview/Movies/Movies";
import MovieDetails from "../MovieReview/MovieDetails/MovieDetails";
import NotFound from "../MovieReview/Common/NotFound";
import Home from "../MovieReview/MovieHome/Home";
import UserProfile from "../MovieReview/UserDetails/UserProfile";
import Celebrities from "../MovieReview/Celebrities/Celebrities";
import CelebrityDetails from "../MovieReview/CelebrityDetails/CelebrityDetails";
import Directors from "../MovieReview/Directors/Directors";
import DirectorDetails from "../MovieReview/DirectorDetails/DirectorDetails";
import SearchList from "../MovieReview/Search/SearchList";
import { route } from "../../Shared/Constants";
import ForgotPassword from "./ForgotPasswordComponent";
import About from "../MovieReview/Footer/About";
import ContactUs from "../MovieReview/Footer/ContactUs";
import NewsList from "./../MovieReview/News/NewsList";
import PrivacyPolicy from "./../MovieReview/Footer/PrivacyPolicy";
import TermsOfUse from "../MovieReview/Footer/TermsOfUse";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route
            path="/admin/Users"
            render={() => <Admin subRoute={route.users} />}
          />
          <Route
            path="/admin/add-celebrities"
            render={() => (
              <Admin
                subRoute={route.celebrity}
                subChildRoute={route.addCelebrity}
              />
            )}
          />
          <Route
            path="/admin/add-directors"
            render={() => (
              <Admin
                subRoute={route.directors}
                subChildRoute={route.addDirector}
              />
            )}
          />
          <Route
            path="/admin/view-celebs"
            render={() => (
              <Admin
                subRoute={route.celebrity}
                subChildRoute={route.viewCelebrity}
              />
            )}
          />
          <Route
            path="/admin/view-directors"
            render={() => (
              <Admin
                subRoute={route.directors}
                subChildRoute={route.viewDirectors}
              />
            )}
          />
          <Route
            path="/admin/edit-director/:id"
            render={() => (
              <Admin
                subRoute={route.directors}
                subChildRoute={route.editDirectors}
              />
            )}
          />

          <Route
            path="/admin/movies"
            render={() => <Admin subRoute={route.movie} />}
          />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/register" component={Register} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/movie-details/:id" component={MovieDetails} />
          <Route path="/movies" component={Movies} />
          <Route path="/celebrity-details/:id" component={CelebrityDetails} />
          <Route path="/director-details/:id" component={DirectorDetails} />
          <Route path="/celebrities/" component={Celebrities} />
          <Route path="/directors/" component={Directors} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/search" component={SearchList} />
          <Route path="/about" component={About} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/currentNews" component={NewsList} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-use" component={TermsOfUse} />
          <Redirect from="*" to="/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
