/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router";
import "../../css/navBar.css";
import { connect } from "react-redux";
import {
  toggleNavBarDropDown,
  toggleSideBar,
} from "../../Store/Actions/actionCreator";
import PopupComponent from "./PopupComponent";
import {
  removeLocalStorageItem,
  clearLocalStorage,
} from "../../Provider/LocalStorageProvider";
import { getLocalStorageItem } from "./../../Provider/LocalStorageProvider";
import { constants } from "../../Shared/Constants";

const cursorStyle = {
  cursor: "pointer",
};

class Navbar extends Component {
  state = {
    showPopup: false,
    show: "",
  };

  handleLogout = () => {
    this.setState({ showPopup: true });
  };

  handleLogoutAction = (event) => {
    if (event.target.name === "No") {
      this.setState({ showPopup: false });
    } else {
      this.setState({ redirectToLogin: true });
      if (getLocalStorageItem(constants.loginDetails).rememberMe)
        removeLocalStorageItem(constants.userDetails);
      else {
        clearLocalStorage();
      }
    }
  };

  handleNavbarDropDown = () => {
    this.setState({ show: this.state.show === "show" ? "" : "show" });
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          opacity: this.props.screenOpacity,
        }}
      >
        <div className="container-fluid">
          <button
            type="button"
            id="buttonColor"
            className="btn btn-primary"
            onClick={this.props.onSideBarToggle}
          >
            <i className="fa fa-bars"></i>
            <span className="sr-only">Toggle Menu</span>
          </button>
          <button
            className="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" onClick={this.handleNavbarDropDown}></i>
          </button>

          <div
            className={`collapse navbar-collapse ${this.state.show}`}
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <i
                  className="fa fa-bell"
                  aria-hidden="true"
                  style={{ marginRight: "5px", marginTop: "11px" }}
                ></i>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={this.handleLogout}
                  style={cursorStyle}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        {this.state.showPopup && (
          <PopupComponent
            showPopup={this.state.showPopup}
            togglePopUp={this.handleLogoutAction}
            modalTitle="Confirm Logout"
            modalBody="Do you really want to logout?"
            modalCancelButtonText="No"
            modalOKButtonText="Yes"
            showCancelButton={true}
          ></PopupComponent>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onNavBarToggle: () => {
    //   dispatch(toggleNavBarDropDown());
    // },
    onSideBarToggle: () => {
      dispatch(toggleSideBar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
