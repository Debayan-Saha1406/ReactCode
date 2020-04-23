/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import image from "../../../images/logo.png";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

class Header extends Component {
  state = {
    display: "none",
    loginPopupClassName: "",
    registerPopupClassName: "",
  };

  toggleNavigation = () => {
    this.setState({
      display: this.state.display === "none" ? "block" : "none",
    });
  };

  openLoginPopup = () => {
    this.setState({ loginPopupClassName: "openform" });
  };

  closeLoginPopup = () => {
    this.setState({ loginPopupClassName: "" });
  };

  closeRegisterPopup = () => {
    this.setState({ registerPopupClassName: "" });
  };

  openRegisterPopup = () => {
    this.setState({ registerPopupClassName: "openform" });
  };

  render() {
    return (
      <React.Fragment>
        <Login
          loginPopupClassName={this.state.loginPopupClassName}
          closeLoginPopup={this.closeLoginPopup}
        ></Login>
        <Register
          registerPopupClassName={this.state.registerPopupClassName}
          closeRegisterPopup={this.closeRegisterPopup}
        ></Register>
        <header class="site-header">
          <div class="container">
            <a href="index.html" id="branding">
              <img src={image} alt="" class="logo" />
              <div class="logo-copy">
                <h1 class="site-title">Company Name</h1>
                <small class="site-description">Tagline goes here</small>
              </div>
            </a>

            <div class="main-navigation">
              <button
                type="button"
                class="menu-toggle"
                onClick={this.toggleNavigation}
              >
                <i class="fa fa-bars"></i>
              </button>
              <ul class="menu">
                <li class="menu-item current-menu-item">
                  <Link to="/movie">Home</Link>
                </li>
                <li class="menu-item">
                  <a>About</a>
                </li>
                <li class="menu-item">
                  <Link to="/movie-grid">Movies</Link>
                </li>
                <li class="menu-item">
                  <a
                    onClick={this.openLoginPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </li>
                <li class="menu-item">
                  <a
                    onClick={this.openRegisterPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </a>
                </li>
              </ul>

              <form action="#" class="search-form">
                <input type="text" placeholder="Search..." />
                <button>
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>

            <div
              class="mobile-navigation"
              style={{ display: this.state.display }}
            >
              <ul class="menu">
                <li class="menu-item current-menu-item">
                  <Link to="/movie">Home</Link>
                </li>
                <li class="menu-item">
                  <a href="about.html">About</a>
                </li>
                <li class="menu-item">
                  <Link to="/movie-grid">Movies</Link>
                </li>
                <li class="menu-item">
                  <a
                    onClick={this.openLoginPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </li>
                <li class="menu-item">
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

export default Header;
