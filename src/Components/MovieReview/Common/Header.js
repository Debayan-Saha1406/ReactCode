/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import image from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { togglePopup } from "./../../../Store/Actions/actionCreator";
import {
  popupType,
  constants,
  page,
  menuItem,
} from "./../../../Shared/Constants";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./../Popups/ForgotPassword";
import ResetPassword from "./../Popups/ResetPassword";
import Information from "./../Popups/Information";
import Logout from "./../Popups/Logout";
import Login from "./../Popups/Login";
import Register from "./../Popups/Register";

class Header extends Component {
  state = {
    display: "none",
    active: "",
    currentMenuItem: menuItem.home,
    isUserLoggedIn: false,
    loggedInEmail: "",
    headerDropdownClass: "none",
    informationTitle: "",
    informationContent: "",
    isForgotPasswordPopupContent: false,
  };

  componentDidMount() {
    this.setActiveMenuItem();
    const userDetails = getLocalStorageItem(constants.userDetails);
    if (!userDetails) {
      this.props.saveUserInfo("", false);
    } else {
      const loginDetails = getLocalStorageItem(constants.loginDetails);
      this.props.saveUserInfo(loginDetails.email, true);
    }
  }

  toggleNavigation = () => {
    this.setState({
      display: this.state.display === "none" ? "block" : "none",
    });
  };

  openSearchBox = () => {
    this.setState({ active: this.state.active === "" ? "active" : "" });
  };

  setCurrentMenuItem = (currentMenuItem) => {
    this.setState({ currentMenuItem, headerDropdownClass: "none" });
  };

  handleDropdownClick = () => {
    this.setActiveMenuItem();
    if (this.state.headerDropdownClass === "block") {
      this.setState({
        headerDropdownClass: "none",
        currentMenuItem: menuItem.home,
      });
    } else {
      this.setState({
        headerDropdownClass: "block",
        currentMenuItem: menuItem.loggedInEmail,
      });
    }
  };

  setActiveMenuItem() {
    if (window.location.pathname.includes(menuItem.movies)) {
      this.setState({ currentMenuItem: menuItem.movies });
    } else {
      this.setState({ currentMenuItem: menuItem.home });
    }
  }

  handleLogout = () => {
    this.props.togglePopup("openform", popupType.logout);
  };

  showInformation = (title, content) => {
    this.setState({
      informationTitle: title,
      informationContent: content,
      isForgotPasswordPopupContent: true,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.popupType === popupType.information && (
          // <Information
          //   loginPopupClassName={this.props.popupClassName}
          //   title={"Reset Password"}
          //   content={
          //     "Your Password Reset Email Has Been Sent. Please Check Your Inbox As You Will Need To Enter The Recovery Code In The Next Screen."
          //   }
          //   handleClose={() =>
          //     this.props.togglePopup("", popupType.resetPassword)
          //   }
          //   handleOk={() => this.props.togglePopup("", popupType.resetPassword)}
          // ></Information>
          <Information
            loginPopupClassName={this.props.popupClassName}
            title={
              this.props.informationTitle
                ? this.props.informationTitle
                : this.state.informationTitle
            }
            content={
              this.props.informationContent
                ? this.props.informationContent
                : this.state.informationContent
            }
            closePopup={(e) => {
              if (this.state.isForgotPasswordPopupContent) {
                this.props.togglePopup("openform", popupType.resetPassword);
              } else if (this.props.handleOk) {
                this.props.handleOk(e);
                this.props.togglePopup("", popupType.information);
              }
            }}
          ></Information>
        )}
        {this.props.popupType === popupType.resetPassword && (
          <ResetPassword
            loginPopupClassName={this.props.popupClassName}
            handleClose={() =>
              this.props.togglePopup("", popupType.resetPassword)
            }
          ></ResetPassword>
        )}
        {this.props.popupType === popupType.forgotPassword && (
          <ForgotPassword
            loginPopupClassName={this.props.popupClassName}
            handleClose={() =>
              this.props.togglePopup("", popupType.forgotPassword)
            }
            showInformation={this.showInformation}
          ></ForgotPassword>
        )}
        {this.props.popupType === popupType.logout && (
          <Logout
            loginPopupClassName={this.props.popupClassName}
            handleClose={(e) => {
              if (this.props.handleOk) {
                //To Handle Logout From side menu
                this.props.handleOk(e);
              }
              this.props.togglePopup("", popupType.logout);
            }}
          ></Logout>
        )}
        {this.props.popupType === popupType.login && (
          <Login
            loginPopupClassName={this.props.popupClassName}
            closeLoginPopup={() => this.props.togglePopup("", popupType.login)}
          ></Login>
        )}
        {this.props.popupType === popupType.register && (
          <Register
            registerPopupClassName={this.props.popupClassName}
            closeRegisterPopup={() =>
              this.props.togglePopup("", popupType.register)
            }
          ></Register>
        )}
        {this.props.page === page.details
          ? this.renderHeader("site-header-celebrity")
          : this.renderHeader("site-header")}
      </React.Fragment>
    );
  }

  renderHeader(className) {
    return (
      <header className={className}>
        <div className="container">
          <a href="index.html" id="branding">
            <img src={image} alt="" className="logo" />
            <div className="logo-copy">
              <h1 className="site-title">Company Name</h1>
              <small className="site-description">Tagline goes here</small>
            </div>
          </a>

          <div className="main-navigation">
            <button
              type="button"
              className="menu-toggle"
              onClick={this.toggleNavigation}
            >
              <i className="fa fa-bars"></i>
            </button>
            <ul className="menu">
              {this.state.currentMenuItem === menuItem.home ? (
                <li className="menu-item current-menu-item">
                  <Link
                    to="/home"
                    onClick={() => this.setCurrentMenuItem(menuItem.home)}
                  >
                    Home
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link
                    to="/home"
                    onClick={() => this.setCurrentMenuItem(menuItem.home)}
                  >
                    Home
                  </Link>
                </li>
              )}
              {this.state.currentMenuItem === menuItem.movies ? (
                <li className="menu-item current-menu-item">
                  <Link
                    to="/movies"
                    onClick={() => this.setCurrentMenuItem(menuItem.movies)}
                  >
                    Movies
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link
                    to="/movies"
                    onClick={() => this.setCurrentMenuItem(menuItem.movies)}
                  >
                    Movies
                  </Link>
                </li>
              )}
              {this.state.currentMenuItem === menuItem.celebrities ? (
                <li className="menu-item current-menu-item">
                  <Link
                    to="/celebrities"
                    onClick={() =>
                      this.setCurrentMenuItem(menuItem.celebrities)
                    }
                  >
                    Celebs
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link
                    to="/celebrities"
                    onClick={() =>
                      this.setCurrentMenuItem(menuItem.celebrities)
                    }
                  >
                    Celebs
                  </Link>
                </li>
              )}
              {this.state.currentMenuItem === menuItem.directors ? (
                <li className="menu-item current-menu-item">
                  <Link
                    to="/directors"
                    onClick={() => this.setCurrentMenuItem(menuItem.directors)}
                  >
                    Directors
                  </Link>
                </li>
              ) : (
                <li className="menu-item">
                  <Link
                    to="/directors"
                    onClick={() => this.setCurrentMenuItem(menuItem.directors)}
                  >
                    Directors
                  </Link>
                </li>
              )}
              {this.props.isUserLoggedIn ? null : (
                <li className="menu-item">
                  <a
                    onClick={() => {
                      this.props.togglePopup("openform", popupType.login);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </li>
              )}
              {this.props.isUserLoggedIn ? (
                this.state.currentMenuItem === menuItem.loggedInEmail ? (
                  <li
                    className="menu-item current-menu-item"
                    id="dropbtn"
                    onClick={this.handleDropdownClick}
                    style={{ cursor: "pointer" }}
                  >
                    {this.props.loggedInEmail}{" "}
                    <i
                      className="fa fa-caret-down"
                      style={{ marginRight: "10px" }}
                    ></i>
                    <div
                      className="dropdown-content"
                      style={{ display: this.state.headerDropdownClass }}
                    >
                      <Link to="/user-profile">View Profile</Link>
                      <a onClick={this.handleLogout}>Logout</a>
                      <a href="#">Link 3</a>
                    </div>
                  </li>
                ) : (
                  <li
                    className="menu-item"
                    id="dropbtn"
                    onClick={this.handleDropdownClick}
                    style={{ cursor: "pointer" }}
                  >
                    {this.props.loggedInEmail}{" "}
                    <i
                      className="fa fa-caret-down"
                      style={{ marginRight: "10px" }}
                    ></i>
                    <div
                      className="dropdown-content"
                      style={{ display: this.state.headerDropdownClass }}
                    >
                      <a href="#">Edit Profile</a>
                      <a href="#">Logout</a>
                      <a href="#">Link 3</a>
                    </div>
                  </li>
                )
              ) : (
                <li className="menu-item">
                  <a
                    onClick={() => {
                      this.props.togglePopup("openform", popupType.register);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </a>
                </li>
              )}
            </ul>

            <form action="#" className="search-form">
              <input
                type="text"
                placeholder="Search..."
                className={`${this.state.active}`}
              />
              <button onClick={this.openSearchBox}>
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div
            className="mobile-navigation"
            style={{ display: this.state.display }}
          >
            <ul className="menu">
              <li className="menu-item current-menu-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="menu-item">
                <a href="about.html">About</a>
              </li>
              <li className="menu-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="menu-item">
                <a onClick={this.openLoginPopup} style={{ cursor: "pointer" }}>
                  Login
                </a>
              </li>
              <li className="menu-item">
                <a href="contact.html">Register</a>
              </li>
            </ul>
          </div>
        </div>
        <ToastContainer autoClose={3000}></ToastContainer>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popupClassName: state.uiDetails.popupClassName,
    isUserLoggedIn: state.loggedInUserInfo.isUserLoggedIn,
    loggedInEmail: state.loggedInUserInfo.loggedInEmail,
    popupType: state.uiDetails.popupType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePopup: (popupClassName, popupType) => {
      dispatch(togglePopup(popupClassName, popupType));
    },
    saveUserInfo: (loggedInEmail, isUserLoggedIn) => {
      dispatch(saveUserInfo(loggedInEmail, isUserLoggedIn));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
