import React, { Component } from "react";
import Navbar from "../Admin/Common/NavBarComponent";
// import SideBar from "./Common/SideBarComponent";
import PopupComponent from "../Admin/Common/PopupComponent";
import { getLocalStorageItem } from "../../Provider/LocalStorageProvider";
import { Redirect } from "react-router-dom";
import "../../css/style.css";
import Main from "./MainComponent";
import LoaderProvider from "../../Provider/LoaderProvider";
import { connect } from "react-redux";
import UsersList from "./UsersList";
import AddCelebrities from "./AddCelebritiesComponent";
import { route } from "../../Shared/Constants";
import SideBar from "../Admin/Common/SideBarComponent";
import AddDirectors from "./AddDirectorsComponent";
import AddMovies from "./AddMoviesComponent";
import ViewCelebrities from "./ViewCelebrities";
import EditCelebrities from "./EditCelebrities";
import ViewDirectors from "./ViewDirectors";
import EditDirectors from "./EditDirectors";
import ViewMovies from "./ViewMovies";
import EditMovies from "./EditMovies";

class Admin extends Component {
  state = {
    showUnAuthorizedPopup: false,
    redirectToLogin: false,
  };

  handleUnAuthorizedPopUp = () => {
    this.setState({ redirectToLogin: true });
  };

  componentDidMount() {
    if (getLocalStorageItem("userDetails") === null) {
      this.setState({ showUnAuthorizedPopup: true });
    }
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        {this.state.showUnAuthorizedPopup && (
          <PopupComponent
            modalTitle="Access Denied!!!"
            modalBody="You are not authorized"
            modalOKButtonText="OK"
            showCancelButton={false}
            showPopup={this.state.showUnAuthorizedPopup}
            togglePopUp={this.handleUnAuthorizedPopUp}
          ></PopupComponent>
        )}
        {!this.state.showUnAuthorizedPopup && (
          <div className="wrapper d-flex align-items-stretch">
            <div id="loaderContainer">
              <div id="loader">
                {this.props.showLoader && (
                  <LoaderProvider
                    visible={this.props.showLoader}
                  ></LoaderProvider>
                )}
              </div>
            </div>
            <SideBar></SideBar>
            <div id="content" className="p-4 p-md-5">
              <Navbar></Navbar>
              {this.props.subRoute === route.users ? (
                <UsersList></UsersList>
              ) : this.props.subRoute === route.movie &&
                this.props.subChildRoute === route.addMovie ? (
                <AddMovies></AddMovies>
              ) : this.props.subRoute === route.movie &&
                this.props.subChildRoute === route.viewMovies ? (
                <ViewMovies></ViewMovies>
              ) : this.props.subRoute === route.movie &&
                this.props.subChildRoute === route.editMovies ? (
                <EditMovies></EditMovies>
              ) : this.props.subRoute === route.celebrity &&
                this.props.subChildRoute === route.addCelebrity ? (
                <AddCelebrities></AddCelebrities>
              ) : this.props.subRoute === route.celebrity &&
                this.props.subChildRoute === route.viewCelebrity ? (
                <ViewCelebrities></ViewCelebrities>
              ) : this.props.subRoute === route.celebrity &&
                this.props.subChildRoute === route.editCelebrity ? (
                <EditCelebrities></EditCelebrities>
              ) : this.props.subRoute === route.directors &&
                this.props.subChildRoute === route.addDirector ? (
                <AddDirectors></AddDirectors>
              ) : this.props.subRoute === route.directors &&
                this.props.subChildRoute === route.viewDirectors ? (
                <ViewDirectors></ViewDirectors>
              ) : this.props.subRoute === route.directors &&
                this.props.subChildRoute === route.editDirectors ? (
                <EditDirectors></EditDirectors>
              ) : (
                <React.Fragment>
                  <Main></Main>
                  <Redirect to="/admin" />
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

export default connect(mapStateToProps, null)(Admin);
