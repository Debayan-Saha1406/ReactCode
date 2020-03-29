import React, { Component } from "react";
import Navbar from "./Common/NavBarComponent";
import SideBar from "./Common/SideBarComponent";
import PopupComponent from "./Common/PopupComponent";
import { getLocalStorageItem} from "../Provider/LocalStorageProvider";
import { Redirect } from "react-router-dom";
import "../css/style.css";
import Main from "./MainComponent";

class Admin extends Component {
  state = {
    showUnAuthorizedPopup: false,
    redirectToLogin: false
  };

  handleUnAuthorizedPopUp = () => {
    this.setState({ redirectToLogin: true });
  };

  componentDidMount() {
    if (getLocalStorageItem("userDetails") === null) {
      this.setState({ showUnAuthorizedPopup: true });
    }
  }

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    
    return (
      <React.Fragment>
        {this.state.showUnAuthorizedPopup && <PopupComponent
          modalTitle="Access Denied!!!"
          modalBody="You are not authorized"
          modalOKButtonText="OK"
          showCancelButton = {false}
          showPopup={this.state.showUnAuthorizedPopup}
          togglePopUp={this.handleUnAuthorizedPopUp}
        ></PopupComponent>}
        {!this.state.showUnAuthorizedPopup &&
        <div className="wrapper d-flex align-items-stretch">
          <SideBar></SideBar>
          <div id="content" className="p-4 p-md-5">
            <Navbar></Navbar>
            <Main></Main>
          </div>
        </div>
        }
        
      </React.Fragment>
    );
  }
}

export default Admin;
