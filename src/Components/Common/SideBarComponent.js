/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../css/sideBar.css";
import { connect } from "react-redux";
import image from "../../images/logo.jpg";
import "../../css/style.css";
import PopupComponent from "./PopupComponent";
import EditDetailsComponent from './EditDetailsComponent';
import { updateUserDetails } from './../../Store/Actions/actionCreator';
import { Link } from 'react-router-dom';

const style = {
  backgroundImage: `url(${image})`
};


class SideBar extends Component {
  state = {
    showPopup: false
  };

  handleEditPopup = () => {
    this.setState({ showPopup: true });
  };

  handlePopupClick = (event) => {
    if(event.target.name === "Yes"){
      this.props.onUpdateClick();
    }
    
    this.setState({ showPopup: false });
  };

  handleUserDetails = (firstName, lastName) =>{
    console.log(this.state)
  }

  render() {
    return (
      <nav id="sidebar" className={this.props.sideBarClassName}>
        <div className="p-4 pt-5">
          <a
            href="#"
            className="img logo rounded-circle mb-5"
            style={style}
          ></a>
          <div style={{marginTop: "-20px" , marginBottom :"20px"}} align="center">
          <label style={{marginRight: "5px"}}>{this.props.firstName}</label>
          <label style={{marginRight: "5px"}}>{this.props.lastName}</label>
          <i
            className="fa fa-pencil"
            aria-hidden="true"
            style={{cursor:'pointer'}}
            onClick={this.handleEditPopup}
          ></i>
          </div>
          <ul className="list-unstyled components mb-5">
            <li className="active">
            <Link to={"/admin/Home"}
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Home
              </Link>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="#">Home 1</a>
                </li>
                <li>
                  <a href="#">Home 2</a>
                </li>
                <li>
                  <a href="#">Home 3</a>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"/admin"}>About</Link>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Pages
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Page 1</a>
                </li>
                <li>
                  <a href="#">Page 2</a>
                </li>
                <li>
                  <a href="#">Page 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        {this.state.showPopup && (
          <PopupComponent
            showPopup={this.state.showPopup}
            modalTitle={"Edit Details"}
            showCancelButton={true}
            modalCancelButtonText={"Cancel"}
            modalOKButtonText={"Update"}
            togglePopUp={this.handlePopupClick}
            component = {<EditDetailsComponent/>}
          ></PopupComponent>
        )}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideBarClassName: state.sideBarReducer.sideBarClassName,
    firstName:state.userDetails.firstName,
    lastName:state.userDetails.lastName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateClick: () => {
      dispatch(updateUserDetails());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
