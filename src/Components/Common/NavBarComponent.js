/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Redirect } from "react-router";
import "../../css/navBar.css";
import { connect } from "react-redux";
import { toggleNavBarDropDown } from "../../Store/Actions/actionCreator";
import { removeLocalStorageItem } from "../../Provider/LocalStorageProvider";
import PopupComponent from "./PopupComponent";

class Navbar extends Component {
  state = {
    redirectToLogin: false,
    showPopup: false
  };

  handleLogout = () => {
    this.setState({ showPopup: true });
  };

  togglePopUp = event => {
    this.props.onNavBarToggle();
    if (event.target.name === "No") {
      this.setState({ showPopup: false });
    } else {
      this.setState({ redirectToLogin: true });
      removeLocalStorageItem();
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand">Traverse</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Need to add collapsing and show to navbar-collapse class */}
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav ">
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <li className="nav-item">
                <a className="nav-link">
                  <i className="fa fa-bell">
                    <span className="badge badge-info">11</span>
                  </i>
                  Test
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  onClick={this.props.onNavBarToggle}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-envelope-o">
                    <span className="badge badge-primary">11</span>
                  </i>
                  Dropdown
                </a>
                <div
                  className={`dropdown-menu ${this.props.showDropDown}`}
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" onClick={this.handleLogout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          {this.state.showPopup && (
            <PopupComponent
              showPopup={this.state.showPopup}
              togglePopUp={this.togglePopUp}
              modalTitle="Confirm Logout"
              modalBody= "Do you really want to logout?"
              modalCancelButtonText="No"
              modalOKButtonText="Yes"
              showCancelButton = {true}
            >
            </PopupComponent>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showDropDown: state.navBarReducer.showDropDown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNavBarToggle: () => {
      dispatch(toggleNavBarDropDown());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
