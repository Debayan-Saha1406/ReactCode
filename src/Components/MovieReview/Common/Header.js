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
    active: "",
    currentMenuItem: "home",
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
          loginPopupClassName={this.state.loginPopupClassName}
          closeLoginPopup={this.closeLoginPopup}
        ></Login>
        <Register
          registerPopupClassName={this.state.registerPopupClassName}
          closeRegisterPopup={this.closeRegisterPopup}
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
                      to="/movie"
                      onClick={() => this.setCurrentMenuItem("home")}
                    >
                      Home
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link
                      to="/movie"
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
                      to="/movie-grid"
                      onClick={() => this.setCurrentMenuItem("movie")}
                    >
                      Movies
                    </Link>
                  </li>
                ) : (
                  <li className="menu-item">
                    <Link
                      to="/movie-grid"
                      onClick={() => this.setCurrentMenuItem("movie")}
                    >
                      Movies
                    </Link>
                  </li>
                )}
                <li className="menu-item">
                  <a
                    onClick={this.openLoginPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={this.openRegisterPopup}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </a>
                </li>
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
                  <Link to="/movie">Home</Link>
                </li>
                <li className="menu-item">
                  <a href="about.html">About</a>
                </li>
                <li className="menu-item">
                  <Link to="/movie-grid">Movies</Link>
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

export default Header;
