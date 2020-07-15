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
              ) : this.props.subRoute === route.celebrity ? (
                <AddCelebrities></AddCelebrities>
              ) : this.props.subRoute === route.directors ? (
                <AddDirectors></AddDirectors>
              ) : this.props.subRoute === route.movie ? (
                <AddMovies></AddMovies>
              ) : (
                <Main></Main>
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
