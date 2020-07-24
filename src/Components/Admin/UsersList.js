/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../css/usersList.css";
import ServiceProvider from "../../Provider/ServiceProvider";
import { apiUrl, userStatus } from "../../Shared/Constants";
import PopupComponent from "./Common/PopupComponent";
import LoaderProvider from "../../Provider/LoaderProvider";

import { connect } from "react-redux";
import { toggleLoader } from "../../Store/Actions/actionCreator";
import ToggleUserStatus from "./ToggleUserStatus";
import Pagination from "./Common/Pagination";
import SearchBar from "./Common/SearchBar";

let reasonForStatusChange = "";

class UsersList extends Component {
  state = {
    users: [],
    isDropdownOpen: false,
    indexClicked: -1,
    showPopup: false,
    currentPage: 1,
    usersPerPage: 5,
    totalUsersCount: 0,
    isFilteredDataPresent: true,
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    const body = {
      pageNumber: this.state.currentPage,
      pageSize: this.state.usersPerPage,
      searchQuery: this.state.searchData,
    };
    ServiceProvider.post(apiUrl.users, body).then((response) => {
      if (response.status === 200) {
        this.setState({
          users: response.data.data.details,
          totalUsersCount: response.data.data.totalCount,
        });
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
    this.setState({ showPopup: true });
  };

  handlePopupButtonClick = (event, user) => {
    if (event.target.name === "Yes") {
      const userStatusId =
        user.userStatusId === userStatus.active
          ? userStatus.blocked
          : userStatus.active;
      const body = {
        userStatus: userStatusId,
        reason:
          reasonForStatusChange.trim() === "" ? null : reasonForStatusChange,
      };
      ServiceProvider.put(apiUrl.updateUserStatus, user.userId, body).then(
        (response) => {
          if (response.status === 200) {
            const users = [...this.state.users];
            user.userStatusId = userStatusId;
            users[this.state.indexClicked] = user;
            this.setState({ users });
          }
        }
      );
    }
    this.setState({ showPopup: false, isDropdownOpen: false });
  };

  handleReason = (reason) => {
    reasonForStatusChange = reason;
  };

  handleSearchIcon = (searchData) => {
    const body = {
      pageNumber: 1,
      pageSize: this.state.usersPerPage,
      searchQuery: searchData.trim() === "" ? null : searchData,
    };
    ServiceProvider.post(apiUrl.users, body).then((response) => {
      if (response.status === 200) {
        if (searchData.trim() === "") {
          this.setState({
            users: response.data.data.details,
            totalUsersCount: response.data.data.totalCount,
            currentPage: 1,
            isFilteredDataPresent: true,
            isDropdownOpen: false,
          });
        } else {
          this.setState({
            users: response.data.data.details,
            totalUsersCount: response.data.data.details.length,
            currentPage: 1,
            isFilteredDataPresent: false,
            isDropdownOpen: false,
          });
        }
      }
    });
  };

  fetchData(currentPage, usersPerPage, searchData) {
    const body = {
      pageNumber: currentPage,
      pageSize: usersPerPage,
      searchQuery: searchData,
    };
    ServiceProvider.post(apiUrl.users, body).then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data.data.details });
      }
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handlePageNumberClick = (currentPage) => {
    this.fetchData(currentPage, this.state.usersPerPage, this.state.searchData);
    this.setState({ currentPage: currentPage, isDropdownOpen: false });
  };

  previousPageClick = () => {
    this.fetchData(
      this.state.currentPage - 1,
      this.state.usersPerPage,
      this.state.searchData
    );
    this.setState({
      currentPage: this.state.currentPage - 1,
      isDropdownOpen: false,
    });
  };

  nextPageClick = () => {
    this.fetchData(
      this.state.currentPage + 1,
      this.state.usersPerPage,
      this.state.searchData
    );
    this.setState({
      currentPage: this.state.currentPage + 1,
      isDropdownOpen: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="user-data m-b-40">
          <div className="title-3 m-b-30">
            <i className="fa fa-user" aria-hidden="true"></i>
            {"  "}user data
            <SearchBar handleSearchIcon={this.handleSearchIcon}></SearchBar>
            {this.state.totalUsersCount > 0 && (
              <div className="pagination">
                <Pagination
                  totalCount={this.state.totalUsersCount}
                  pageNumberClicked={this.handlePageNumberClick}
                  currentPage={this.state.currentPage}
                  pageSize={this.state.usersPerPage}
                  previousPageClicked={this.previousPageClick}
                  nextPageClicked={this.nextPageClick}
                ></Pagination>
              </div>
            )}
          </div>
          <div className="table-responsive table-data">
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
              <tbody>
                {this.state.users.length === 0 &&
                !this.state.isFilteredDataPresent ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{"No Record Found..."}</td>
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
                        {user.userStatusId === userStatus.active ? (
                          <span className="role member">Active</span>
                        ) : user.userStatusId === userStatus.pending ? (
                          <span className="role pending">Pending Approval</span>
                        ) : (
                          <span className="role admin">Blocked</span>
                        )}
                      </td>
                      <td>
                        <div
                          className="dropdown"
                          style={{ color: "black", overflow: "inherit" }}
                        >
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
                                onClick={this.handleBlockAction}
                                style={{ cursor: "pointer" }}
                              >
                                {user.userStatusId === userStatus.active
                                  ? "Block"
                                  : user.userStatusId === userStatus.pending
                                  ? "Approve"
                                  : "Unblock"}
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
          {this.state.showPopup && (
            <PopupComponent
              showPopup={this.state.showPopup}
              togglePopUp={(event) =>
                this.handlePopupButtonClick(
                  event,
                  this.state.users[this.state.indexClicked]
                )
              }
              modalTitle={`${
                this.state.users[this.state.indexClicked].userStatusId ===
                userStatus.active
                  ? "Block User"
                  : this.state.users[this.state.indexClicked].userStatusId ===
                    userStatus.pending
                  ? "Approve User As Admin"
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
                <LoaderProvider
                  visible={this.props.showLoader}
                ></LoaderProvider>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
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
