/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../css/usersList.css";
import ServiceProvider from "./../Provider/ServiceProvider";
import { apiUrl } from "../Shared/Constants";
import PopupComponent from "./Common/PopupComponent";
import LoaderProvider from "./../Provider/LoaderProvider";

import { connect } from "react-redux";
import { toggleLoader } from "../Store/Actions/actionCreator";

class UsersList extends Component {
  state = {
    users: [],
    isDropdownOpen: false,
    indexClicked: -1,
    showBlockPopup: false,
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    ServiceProvider.get(apiUrl.users).then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data.data });
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
        UserStatus: !user.isActive,
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

  render() {
    return (
      <div className="user-data m-b-40">
        <h3 className="title-3 m-b-30">
          <i className="zmdi zmdi-account-calendar"></i>user data
        </h3>
        <div className="filters m-b-45"></div>
        <div className="table-responsive table-data">
          <table className="table">
            <thead>
              <tr>
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
              {this.state.users.map((user, index) => (
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
                            Block
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
              ))}
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
            modalTitle="Block User"
            modalBody={`Are You Sure You Want To ${
              this.state.users[this.state.indexClicked].isActive === true
                ? "Block"
                : "Unblock"
            } This User?`}
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
