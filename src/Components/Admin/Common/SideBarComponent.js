/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/sideBar.css";
import { connect } from "react-redux";
import "../../../css/style.css";
import PopupComponent from "../Common/PopupComponent";
import {
  updateUserDetails,
  handleProfileImage,
  deleteProfileImage,
} from "../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { ToastContainer } from "react-toastify";
import { ImagePickerProvider } from "../../../Provider/ImagePickerProvider";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, constants, route } from "../../../Shared/Constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../Provider/LocalStorageProvider";
import avatar from "../../../images/avatar.jpg";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import EditDetailsComponent from "../../Admin/EditDetailsComponent";

class SideBar extends Component {
  state = {
    showPopup: false,
    showPencilIcon: false,
    iconOpacity: 0,
    imageOpacity: 1,
    hasUploadErrors: true,
    showDeleteProfileImagePopup: false,
    showTrashIcon: true,
    activeLink: "Dashboard",
    celebSideBarClass: "",
    directorSideBarClass: "",
    movieSideBarClass: "",
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
      ServiceProvider.put(apiUrl.userInfo, this.props.userId, body).then(
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
    const userInfo = getLocalStorageItem(constants.userDetails);
    if (userInfo !== null) {
      userInfo.profileImageUrl = avatar;
      setLocalStorageItem(constants.userDetails, userInfo);
    }
  }

  updateLocalStorage() {
    const userInfo = getLocalStorageItem(constants.userDetails);
    if (userInfo !== null) {
      userInfo.firstName = this.props.updatedFirstName;
      userInfo.lastName = this.props.updatedLastName;
      setLocalStorageItem(constants.userDetails, userInfo);
    }
  }

  updateProfileImage(image) {
    const userInfo = getLocalStorageItem(constants.userDetails);
    if (userInfo !== null) {
      userInfo.profileImageUrl = image;
      setLocalStorageItem(constants.userDetails, userInfo);
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
    this.setActiveSideBarLink();
    const userInfo = getLocalStorageItem(constants.userDetails);
    if (userInfo) {
      if (!userInfo.profileImageUrl) {
        this.setState({ showTrashIcon: false });
      } else {
        this.setState({ showTrashIcon: true });
      }
    }
  }

  handleSideMenuClick = (activeLink) => {
    if (
      activeLink === route.addDirector ||
      activeLink === route.editDirectors ||
      activeLink === route.viewDirectors
    ) {
      this.setState({
        directorSideBarClass: "show",
        celebSideBarClass: "",
        movieSideBarClass: "",
        activeLink,
      });
    } else if (
      activeLink === route.addCelebrity ||
      activeLink === route.editCelebrity ||
      activeLink === route.viewCelebrity
    ) {
      this.setState({
        directorSideBarClass: "",
        celebSideBarClass: "show",
        movieSideBarClass: "",
        activeLink,
      });
    } else if (
      activeLink === route.addMovie ||
      activeLink === route.editMovies ||
      activeLink === route.viewMovies
    ) {
      this.setState({
        directorSideBarClass: "",
        celebSideBarClass: "",
        movieSideBarClass: "show",
        activeLink,
      });
    } else {
      this.setState({
        directorSideBarClass: "",
        celebSideBarClass: "",
        movieSideBarClass: "",
        activeLink,
      });
    }
  };

  setActiveSideBarLink() {
    if (window.location.pathname.includes(route.addMovie)) {
      this.setState({
        activeLink: route.addMovie,
        movieSideBarClass: "show",
      });
    } else if (
      window.location.pathname.includes(route.viewMovies) ||
      window.location.pathname.includes(route.editMovies)
    ) {
      this.setState({
        activeLink: route.viewMovies,
        movieSideBarClass: "show",
      });
    } else if (window.location.pathname.includes(route.users)) {
      this.setState({ activeLink: route.users });
    } else if (window.location.pathname.includes(route.celebrity)) {
      this.setState({ activeLink: route.celebrity });
    } else if (window.location.pathname.includes(route.addCelebrity)) {
      this.setState({
        activeLink: route.addCelebrity,
        celebSideBarClass: "show",
      });
    } else if (
      window.location.pathname.includes(route.viewCelebrity) ||
      window.location.pathname.includes(route.editCelebrity)
    ) {
      this.setState({
        activeLink: route.viewCelebrity,
        celebSideBarClass: "show",
      });
    } else if (window.location.pathname.includes(route.addDirector)) {
      this.setState({
        activeLink: route.addDirector,
        directorSideBarClass: "show",
      });
    } else if (
      window.location.pathname.includes(route.viewDirectors) ||
      window.location.pathname.includes(route.editDirectors)
    ) {
      this.setState({
        activeLink: route.viewDirectors,
        directorSideBarClass: "show",
      });
    } else if (window.location.pathname.includes(route.dashboard)) {
      this.setState({ activeLink: route.dashboard });
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
            {this.state.activeLink === route.dashboard ? (
              <li className="active">
                <Link
                  to={"/admin"}
                  onClick={() => this.handleSideMenuClick(route.dashboard)}
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to={"/admin"}
                  onClick={() => this.handleSideMenuClick(route.dashboard)}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {this.state.activeLink === route.movie ? (
              <li className="active">
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  onClick={() => {
                    if (this.state.movieSideBarClass === "") {
                      this.setState({
                        movieSideBarClass: "show",
                      });
                    } else {
                      this.setState({ movieSideBarClass: "" });
                    }
                  }}
                >
                  Movies
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.movieSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addMovie ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-movie"}
                        onClick={() => this.handleSideMenuClick(route.addMovie)}
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-movie"}
                        onClick={() => this.handleSideMenuClick(route.addMovie)}
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewMovies ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-movies"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewMovies)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-movies"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewMovies)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle collapsed"
                  onClick={() => {
                    if (this.state.movieSideBarClass === "") {
                      this.setState({
                        movieSideBarClass: "show",
                      });
                    } else {
                      this.setState({ movieSideBarClass: "" });
                    }
                  }}
                >
                  Movies
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.movieSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addMovie ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-movie"}
                        onClick={() => this.handleSideMenuClick(route.addMovie)}
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-movie"}
                        onClick={() => this.handleSideMenuClick(route.addMovie)}
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewMovies ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-movies"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewMovies)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-movies"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewMovies)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {/* Here it is */}
            {this.state.activeLink === route.celebrity ? (
              <li className="active">
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  onClick={() => {
                    if (this.state.celebSideBarClass === "") {
                      this.setState({
                        celebSideBarClass: "show",
                      });
                    } else {
                      this.setState({ celebSideBarClass: "" });
                    }
                  }}
                >
                  Celebrities
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.celebSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addCelebrity ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-celebrities"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addCelebrity)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-celebrities"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addCelebrity)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewCelebrity ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-celebs"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewCelebrity)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-celebs"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewCelebrity)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle collapsed"
                  onClick={() => {
                    if (this.state.celebSideBarClass === "") {
                      this.setState({
                        celebSideBarClass: "show",
                      });
                    } else {
                      this.setState({ celebSideBarClass: "" });
                    }
                  }}
                >
                  Celebrities
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.celebSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addCelebrity ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-celebrities"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addCelebrity)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-celebrities"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addCelebrity)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewCelebrity ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-celebs"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewCelebrity)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-celebs"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewCelebrity)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {this.state.activeLink === route.directors ? (
              <li className="active">
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  onClick={() => {
                    if (this.state.directorSideBarClass === "") {
                      this.setState({
                        directorSideBarClass: "show",
                      });
                    } else {
                      this.setState({ directorSideBarClass: "" });
                    }
                  }}
                >
                  Directors
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.directorSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addDirector ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addDirector)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addDirector)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewDirectors ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewDirectors)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewDirectors)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            ) : (
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  class="dropdown-toggle collapsed"
                  onClick={() => {
                    if (this.state.directorSideBarClass === "") {
                      this.setState({
                        directorSideBarClass: "show",
                      });
                    } else {
                      this.setState({ directorSideBarClass: "" });
                    }
                  }}
                >
                  Directors
                </Link>
                <ul
                  class={`list-unstyled side-collapse ${this.state.directorSideBarClass}`}
                  id="homeSubmenu"
                >
                  {this.state.activeLink === route.addDirector ? (
                    <li className="active">
                      <Link
                        to={"/admin/add-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addDirector)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/add-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.addDirector)
                        }
                      >
                        Add
                      </Link>
                    </li>
                  )}
                  {this.state.activeLink === route.viewDirectors ? (
                    <li className="active">
                      <Link
                        to={"/admin/view-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewDirectors)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={"/admin/view-directors"}
                        onClick={() =>
                          this.handleSideMenuClick(route.viewDirectors)
                        }
                      >
                        View And Edit
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

            {this.state.activeLink === route.users ? (
              <li className="active">
                <Link
                  to={"/admin/users"}
                  onClick={() => this.handleSideMenuClick(route.users)}
                >
                  Users
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to={"/admin/users"}
                  onClick={() => this.handleSideMenuClick(route.users)}
                >
                  Users
                </Link>
              </li>
            )}
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
    sideBarClassName: state.sideBarDetails.sideBarClassName,
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
