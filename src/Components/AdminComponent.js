import React, { Component } from "react";
import Navbar from "./Common/NavBarComponent";
import SideBar from "./Common/SideBarComponent";

class Admin extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <SideBar></SideBar>
      </React.Fragment>
    );
  }
}

export default Admin;
