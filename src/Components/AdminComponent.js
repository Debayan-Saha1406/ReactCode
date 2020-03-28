import React, { Component } from "react";
import Navbar from "./Common/NavBarComponent";
import SideBar from "./Common/SideBarComponent";
import PopupComponent from "./Common/PopupComponent";

class Admin extends Component {
  state = {
  };

  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <PopupComponent></PopupComponent>
        <SideBar></SideBar>
      </React.Fragment>
    );
  }
}

export default Admin;
