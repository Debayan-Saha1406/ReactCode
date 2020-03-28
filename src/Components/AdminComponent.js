import React, { Component } from "react";
import Navbar from "./Common/NavBarComponent";
import SideBar from "./Common/SideBarComponent";
import PopupComponent from "./Common/PopupComponent";
import { getLocalStorageItem } from "../Provider/LocalStorageProvider";

class Admin extends Component {
  state = {
    showPopup: false
  };

  togglePopUp = () => {
    this.setState({ showPopup: !this.state.showPopup });
  }

  componentDidMount()  {
    if(getLocalStorageItem("userDetails") === null){
      this.setState({ showPopup: true }); 
    }  
    }
    
  render() {
    return (
      <React.Fragment>
        <Navbar></Navbar>
        <PopupComponent modalTitle={"unauthorized!!!"} modalBody={"Error 401"}
          modalCancelButtonText={"Cancel"} modalOKButtonText={"OK"}
          showPopup={this.state.showPopup} togglePopUp={this.togglePopUp}></PopupComponent>

        <SideBar></SideBar>
      </React.Fragment>
    );
  }
}

export default Admin;
