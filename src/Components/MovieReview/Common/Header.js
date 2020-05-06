/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import image from "../../../images/logo.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";
import { togglePopup } from "./../../../Store/Actions/actionCreator";
import { popupType, constants } from "./../../../Shared/Constants";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";

class Header extends Component {
  state = {
    display: "none",
    active: "",
    currentMenuItem: "home",
    isUserLoggedIn: false,
    loggedInEmail: "",
  };

  componentDidMount() {
    const loginDetails = getLocalStorageItem(constants.loginDetails);
    if (!loginDetails) {
      this.props.saveUserInfo("", false);
    } else {
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
    this.setState({ currentMenuItem });
  };

  render() {
    return (
      <React.Fragment>
        <Login
          loginPopupClassName={this.props.loginPopupClassName}
          closeLoginPopup={() => this.props.togglePopup("", popupType.login)}
        ></Login>
        <Register
          registerPopupClassName={this.props.registerPopupClassName}
          closeRegisterPopup={() =>
            this.props.togglePopup("", popupType.register)
          }
        ></Register>
        <header className="site-header">
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
                {this.state.currentMenuItem === "home" ? (
                  <li className="menu-item current-menu-item">
                    <Link
                      to="/home"
                      onClick={() => this.setCurrentMenuItem("home")}
                    >
                      Home
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link
                      to="/home"
                      onClick={() => this.setCurrentMenuItem("home")}
                    >
                      Home
                    </Link>
                  </li>
                )}
                <li className="menu-item">
                  <a>About</a>
                </li>
                {this.state.currentMenuItem === "movie" ? (
                  <li className="menu-item current-menu-item">
                    <Link
                      to="/movies"
                      onClick={() => this.setCurrentMenuItem("movie")}
                    >
                      Movies
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link
                      to="/movies"
                      onClick={() => this.setCurrentMenuItem("movie")}
                    >
                      Movies
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
                  <li className="menu-item">
                    <a onClick={() => {}} style={{ cursor: "pointer" }}>
                      {this.props.loggedInEmail}
                    </a>
                  </li>
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
                  <a
                    onClick={this.openLoginPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </li>
                <li className="menu-item">
                  <a href="contact.html">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginPopupClassName: state.uiDetails.loginPopupClassName,
    registerPopupClassName: state.uiDetails.registerPopupClassName,
    isUserLoggedIn: state.loggedInUserInfo.isUserLoggedIn,
    loggedInEmail: state.loggedInUserInfo.loggedInEmail,
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
