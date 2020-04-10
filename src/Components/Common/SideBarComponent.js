/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../css/sideBar.css";
import { connect } from "react-redux";
import "../../css/style.css";
import PopupComponent from "./PopupComponent";
import EditDetailsComponent from "./EditDetailsComponent";
import {
  updateUserDetails,
  updateProfileImage,
  deleteProfileImage,
} from "./../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import { showErrorMessage } from "../../Provider/ToastProvider";
import { ToastContainer } from "react-toastify";
import { ImagePickerProvider } from "../../Provider/ImagePickerProvider";
import ServiceProvider from "./../../Provider/ServiceProvider";
import { apiUrl, constants } from "../../Shared/Constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "./../../Provider/LocalStorageProvider";

class SideBar extends Component {
  state = {
    showPopup: false,
    showPencilIcon: false,
    iconOpacity: 0,
    imageOpacity: 1,
    hasUploadErrors: true,
  };

  handleEditPopup = () => {
    this.setState({ showPopup: true });
  };

  handlePopupClick = (event) => {
    if (
      event.target.name === "Yes" &&
      (this.props.updatedFirstName !== "" || this.props.updatedLastName !== "")
    ) {
      const body = {
        firstName: this.props.updatedFirstName,
        lastName: this.props.updatedLastName,
      };
      ServiceProvider.put(apiUrl.update, this.props.userId, body).then(
        (response) => {
          this.updateLocalStorage();
          this.props.onUpdateClick();
        }
      );
    }

    this.setState({ showPopup: false });
  };

  onMouseOver = () => {
    this.setState({ iconOpacity: 1, imageOpacity: "15%" });
  };

  onMouseOut = () => {
    this.setState({ iconOpacity: 0, imageOpacity: 1 });
  };

  handleIncorrectFileFormat = (errMsg) => {
    this.setState({
      hasUploadErrors: false,
      iconOpacity: 0,
      imageOpacity: 1,
    });
    showErrorMessage(errMsg);
  };

  handleFileChange = (image) => {
    this.setState({
      iconOpacity: 0,
      imageOpacity: 1,
    });
    this.props.onFileChange(image);
  };

  updateLocalStorage() {
    const userInfo = JSON.parse(getLocalStorageItem(constants.userDetails));
    userInfo.firstName = this.props.updatedFirstName;
    userInfo.lastName = this.props.updatedLastName;
    setLocalStorageItem(constants.userDetails, JSON.stringify(userInfo));
  }

  render() {
    return (
      <nav id="sidebar" className={this.props.sideBarClassName}>
        <div className="p-4 pt-5">
          {!this.state.hasUploadErrors && <ToastContainer></ToastContainer>}
          <div style={{ position: "relative", left: 0, top: 0 }}>
            <a
              className="img logo rounded-circle mb-5"
              style={{
                backgroundImage: `url(${this.props.image})`,
                opacity: `${this.state.imageOpacity}`,
              }}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            ></a>
            <ImagePickerProvider
              handleFileChange={(image) => this.handleFileChange(image)}
              handleIncorrectFileFormat={(errMsg) =>
                this.handleIncorrectFileFormat(errMsg)
              }
              fileComponent={
                <div id="editPencil">
                  <i
                    class="fa fa-pencil fa-lg"
                    id="pencilHover"
                    style={{
                      cursor: "pointer",
                      opacity: `${this.state.iconOpacity}`,
                    }}
                    onMouseOver={this.onMouseOver}
                  ></i>
                </div>
              }
            ></ImagePickerProvider>
            <div id="editTrash">
              <i
                class="fa fa-trash"
                aria-hidden="true"
                id="trash"
                style={{
                  cursor: "pointer",
                  opacity: `${this.state.iconOpacity}`,
                }}
                onMouseOver={this.onMouseOver}
                onClick={this.props.onDeleteImage}
              ></i>
            </div>
          </div>
          <div
            style={{ marginTop: "-20px", marginBottom: "20px" }}
            align="center"
          >
            <label style={{ marginRight: "5px" }}>{this.props.firstName}</label>
            <label style={{ marginRight: "5px" }}>{this.props.lastName}</label>
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              id="pencil"
              style={{ cursor: "pointer" }}
              onClick={this.handleEditPopup}
            ></i>
          </div>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <Link
                to={"/admin/Home"}
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
            component={<EditDetailsComponent />}
          ></PopupComponent>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sideBarClassName: state.sideBarReducer.sideBarClassName,
    userId: state.userDetails.userId,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    image: state.userDetails.profileImage,
    updatedFirstName: state.userDetails.updatedFirstName,
    updatedLastName: state.userDetails.updatedLastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick: () => {
      dispatch(updateUserDetails());
    },
    onFileChange: (selectedImage) => {
      dispatch(updateProfileImage(selectedImage));
    },
    onDeleteImage: () => {
      dispatch(deleteProfileImage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
