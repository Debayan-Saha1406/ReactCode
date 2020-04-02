/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../css/sideBar.css";
import { connect } from "react-redux";
import image from "../../images/bg-01.jpg";
import "../../css/style.css";
import PopupComponent from "./PopupComponent";
import EditDetailsComponent from "./EditDetailsComponent";
import {
  updateUserDetails,
  updateProfileImage,
  deleteProfileImage
} from "./../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import { ImagePicker } from "react-file-picker";

class SideBar extends Component {
  state = {
    showPopup: false,
    showPencilIcon: false,
    iconOpacity: 0,
    imageOpacity: 1
  };

  handleEditPopup = () => {
    this.setState({ showPopup: true });
  };

  handlePopupClick = event => {
    if (event.target.name === "Yes") {
      this.props.onUpdateClick();
    }

    this.setState({ showPopup: false });
  };

  onMouseOver = () => {
    this.setState({ iconOpacity: 1, imageOpacity: "15%" });
  };

  onMouseOut = () => {
    this.setState({ iconOpacity: 0, imageOpacity: 1 });
  };

  render() {
    return (
      <nav id="sidebar" className={this.props.sideBarClassName}>
        <div className="p-4 pt-5">
          <div style={{ position: "relative", left: 0, top: 0 }}>
            <a
              className="img logo rounded-circle mb-5"
              style={{
                backgroundImage: `url(${this.props.image})`,
                opacity: `${this.state.imageOpacity}`
              }}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            ></a>
            <ImagePicker
              extensions={["jpg", "jpeg", "png"]}
              dims={{
                minWidth: 100,
                maxWidth: 5500,
                minHeight: 100,
                maxHeight: 5500
              }}
              onChange={image => this.props.onFileChange(image)}
              onError={errMsg => console.log(errMsg)}
            >
              <div id="editPencil">
                <i
                  class="fa fa-pencil fa-lg"
                  id="pencilHover"
                  style={{
                    cursor: "pointer",
                    opacity: `${this.state.iconOpacity}`
                  }}
                  onMouseOver={this.onMouseOver}
                ></i>
              </div>
            </ImagePicker>
            <div id="editTrash">
              <i
                class="fa fa-trash"
                aria-hidden="true"
                id="trash"
                style={{
                  cursor: "pointer",
                  opacity: `${this.state.iconOpacity}`
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

const mapStateToProps = state => {
  return {
    sideBarClassName: state.sideBarReducer.sideBarClassName,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    image: state.userDetails.profileImage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateClick: () => {
      dispatch(updateUserDetails());
    },
    onFileChange: selectedImage => {
      dispatch(updateProfileImage(selectedImage));
    },
    onDeleteImage: () => {
      dispatch(deleteProfileImage());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
