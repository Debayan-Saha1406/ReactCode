/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../css/usersList.css";
import ServiceProvider from "./../Provider/ServiceProvider";
import { apiUrl } from "../Shared/Constants";
import PopupComponent from "./Common/PopupComponent";
import LoaderProvider from "./../Provider/LoaderProvider";

import { connect } from "react-redux";
import { toggleLoader } from "../Store/Actions/actionCreator";
import ToggleUserStatus from "./ToggleUserStatus";

let reasonForStatusChange = "";

class UsersList extends Component {
  state = {
    users: [],
    isDropdownOpen: false,
    indexClicked: -1,
    showBlockPopup: false,
    searchData: "",
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    const body = {
      pageNumber: 1,
      pageSize: 10,
      searchQuery: this.state.searchData,
    };
    ServiceProvider.post(apiUrl.users, body).then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data.data.userDetails });
        this.props.toggleLoader(false, 1);
      }
    });
  }

  handleThreeDotMenu = (index) => {
    this.setState({
      indexClicked: index,
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.indexClicked !== this.state.indexClicked) {
      this.setState({ isDropdownOpen: true });
    }
  }

  handleBlockAction = () => {
    this.setState({ showBlockPopup: true });
  };

  handlePopupButtonClick = (event, user) => {
    if (event.target.name === "Yes") {
      const body = {
        userStatus: !user.isActive,
        reason:
          reasonForStatusChange.trim() === "" ? null : reasonForStatusChange,
      };
      ServiceProvider.put(apiUrl.updateUserStatus, user.userId, body).then(
        (response) => {
          if (response.status === 200) {
            const users = [...this.state.users];
            user.isActive = !user.isActive;
            users[this.state.indexClicked] = user;
            this.setState({ users });
          }
        }
      );
    }
    this.setState({ showBlockPopup: false, isDropdownOpen: false });
  };

  handleReason = (reason) => {
    reasonForStatusChange = reason;
  };

  handleSearchIcon = () => {
    const body = {
      pageNumber: 1,
      pageSize: 10,
      searchQuery: this.state.searchData,
    };
    ServiceProvider.post(apiUrl.users, body).then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data.data.userDetails });
      }
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="user-data m-b-40">
        <div className="title-3 m-b-30">
          <i className="fa fa-user" aria-hidden="true"></i>
          {"  "}user data
          <div className="search-container">
            <input
              type="text"
              placeholder="Search.."
              name="searchData"
              className="searchText"
              onChange={this.handleChange}
              value={this.state.searchData}
            />
            <button onClick={this.handleSearchIcon}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="header">
              <td>id</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>status</td>
              <td>type</td>
              <td></td>
            </tr>
          </thead>
        </table>
        <div className="table-responsive table-data">
          <table className="table">
            <tbody>
              {this.state.users.length === 0 ? (
                <tr>
                  <td colSpan="6">{"No Record Found..."}</td>
                </tr>
              ) : (
                this.state.users.map((user, index) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>
                      <div className="table-data__info">
                        <h6>
                          {user.firstName} {user.lastName}
                        </h6>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <span className="role member">Admin</span>
                      ) : (
                        <span className="role user">User</span>
                      )}
                    </td>
                    <td>
                      {user.isActive ? (
                        <span className="role member">Active</span>
                      ) : (
                        <span className="role admin">Blocked</span>
                      )}
                    </td>
                    <td>
                      <div className="dropdown">
                        <i
                          className="fa fa-ellipsis-v"
                          onClick={() => this.handleThreeDotMenu(index)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        {this.state.indexClicked === index &&
                        this.state.isDropdownOpen ? (
                          <div
                            className="dropdown-menu show"
                            id="dropdown"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Manage Access
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={this.handleBlockAction}
                              style={{ cursor: "pointer" }}
                            >
                              {user.isActive ? "Block" : "Unblock"}
                            </a>
                            <a
                              className="dropdown-item"
                              style={{ cursor: "pointer" }}
                            >
                              Something else here
                            </a>
                          </div>
                        ) : (
                          <div
                            className="dropdown-menu"
                            id="dropdown"
                            aria-labelledby="dropdownMenuButton"
                          >
                            {" "}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {this.state.showBlockPopup && (
          <PopupComponent
            showPopup={this.state.showBlockPopup}
            togglePopUp={(event) =>
              this.handlePopupButtonClick(
                event,
                this.state.users[this.state.indexClicked]
              )
            }
            modalTitle={`${
              this.state.users[this.state.indexClicked].isActive === true
                ? "Block User"
                : "Unblock User"
            }`}
            component={
              <ToggleUserStatus reason={this.handleReason}></ToggleUserStatus>
            }
            modalOKButtonText="Yes"
            modalCancelButtonText="No"
            showCancelButton={true}
          ></PopupComponent>
        )}
        <div id="loaderContainer">
          <div id="loader">
            {this.props.showLoader && (
              <LoaderProvider visible={this.props.showLoader}></LoaderProvider>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
