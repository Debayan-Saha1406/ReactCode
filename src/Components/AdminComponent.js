import React, { Component } from "react";
import Navbar from "./Common/NavBarComponent";
import SideBar from "./Common/SideBarComponent";
import PopupComponent from "./Common/PopupComponent";
import { getLocalStorageItem } from "../Provider/LocalStorageProvider";
import { Redirect } from "react-router-dom";

class Admin extends Component {
  state = {
    showPopup: false,
    showLoginPage: false
  };

  togglePopUp = () => {
    this.setState({ showPopup: true, showLoginPage: true });
  };

  componentDidMount() {
    if (getLocalStorageItem("userDetails") === null) {
      this.setState({ showPopup: true });
    }
  }

  render() {
    if (this.state.showLoginPage) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <PopupComponent
          modalTitle="Access Denied!!!"
          modalBody="You are not authorized"
          modalOKButtonText="OK"
          showCancelButton = {false}
          showPopup={this.state.showPopup}
          togglePopUp={this.togglePopUp}
        ></PopupComponent>

        <SideBar></SideBar>
      </React.Fragment>
    );
  }
}

export default Admin;
