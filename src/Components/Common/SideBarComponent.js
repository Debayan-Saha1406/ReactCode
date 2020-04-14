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
  handleProfileImage,
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
import avatar from "../../images/avatar.jpg";
import { toggleLoader } from "./../../Store/Actions/actionCreator";

class SideBar extends Component {
  state = {
    showPopup: false,
    showPencilIcon: false,
    iconOpacity: 0,
    imageOpacity: 1,
    hasUploadErrors: true,
    showDeleteProfileImagePopup: false,
    showTrashIcon: true,
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
      this.props.toggleLoader(true, "15%");
      ServiceProvider.put(apiUrl.update, this.props.userId, body).then(
        (response) => {
          if (response.status === 200) {
            this.updateLocalStorage();
            this.props.onUpdateClick();
            this.props.toggleLoader(false, 1);
          } else {
            showErrorMessage(response.data.errors);
            this.props.toggleLoader(false, 1);
          }
        }
      );
    }

    this.setState({ showPopup: false });
  };

  deleteProfileImageClick = (event) => {
    if (event.target.name === "Yes") {
      this.props.onDeleteImage(this.props.userId, avatar);
      this.deleteProfileImageFromLocalStorage();
      this.setState({ showTrashIcon: false });
    }

    this.setState({
      showDeleteProfileImagePopup: false,
      iconOpacity: 0,
      imageOpacity: 1,
    });
  };

  deleteProfileImageFromLocalStorage() {
    const userInfo = JSON.parse(getLocalStorageItem(constants.userDetails));
    if (userInfo !== null) {
      userInfo.profileImageUrl = avatar;
      setLocalStorageItem(constants.userDetails, JSON.stringify(userInfo));
    }
  }

  updateLocalStorage() {
    const userInfo = JSON.parse(getLocalStorageItem(constants.userDetails));
    if (userInfo !== null) {
      userInfo.firstName = this.props.updatedFirstName;
      userInfo.lastName = this.props.updatedLastName;
      setLocalStorageItem(constants.userDetails, JSON.stringify(userInfo));
    }
  }

  updateProfileImage(image) {
    const userInfo = JSON.parse(getLocalStorageItem(constants.userDetails));
    if (userInfo !== null) {
      userInfo.profileImageUrl = image;
      setLocalStorageItem(constants.userDetails, JSON.stringify(userInfo));
    }
  }

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
      showTrashIcon: false,
    });
    showErrorMessage(errMsg);
  };

  handleFileChange = (image) => {
    this.setState({
      iconOpacity: 0,
      imageOpacity: 1,
      showTrashIcon: true,
    });

    this.props.onFileChange(image, this.props.userId);
    this.updateProfileImage(image);
  };

  deleteProfileImage = () => {
    this.setState({ showDeleteProfileImagePopup: true });
  };

  componentDidMount() {
    const userInfo = JSON.parse(getLocalStorageItem(constants.userDetails));
    if (userInfo) {
      if (!userInfo.profileImageUrl) {
        this.setState({ showTrashIcon: false });
      } else {
        this.setState({ showTrashIcon: true });
      }
    }
  }

  render() {
    return (
      <nav
        id="sidebar"
        className={this.props.sideBarClassName}
        style={{
          opacity: this.props.screenOpacity,
        }}
      >
        <div className="p-4 pt-5">
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
                    className="fa fa-pencil fa-lg"
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
            {this.state.showTrashIcon && (
              <div id="editTrash">
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  id="trash"
                  style={{
                    cursor: "pointer",
                    opacity: `${this.state.iconOpacity}`,
                  }}
                  onMouseOver={this.onMouseOver}
                  onClick={this.deleteProfileImage}
                ></i>
              </div>
            )}
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
            <br></br>
            <label style={{ marginRight: "5px" }}>{this.props.email}</label>
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
        {this.state.showDeleteProfileImagePopup && (
          <PopupComponent
            showPopup={this.state.showDeleteProfileImagePopup}
            modalTitle={"Delete Profile Image"}
            showCancelButton={true}
            modalCancelButtonText={"Cancel"}
            modalOKButtonText={"Delete"}
            togglePopUp={this.deleteProfileImageClick}
            modalBody={"Are You Sure You Want To Delete Your Profile Image?"}
          ></PopupComponent>
        )}
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
        {!this.state.hasUploadErrors && <ToastContainer></ToastContainer>}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sideBarClassName: state.sideBarReducer.sideBarClassName,
    email: state.userDetails.email,
    userId: state.userDetails.userId,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    image: state.userDetails.profileImage,
    updatedFirstName: state.userDetails.updatedFirstName,
    updatedLastName: state.userDetails.updatedLastName,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick: () => {
      dispatch(updateUserDetails());
    },
    onFileChange: (selectedImage, userId) => {
      dispatch(handleProfileImage(selectedImage, userId));
    },
    onDeleteImage: (userId, defaultImage) => {
      dispatch(deleteProfileImage(userId, defaultImage));
    },
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
