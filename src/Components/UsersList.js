/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../css/usersList.css";
import ServiceProvider from "./../Provider/ServiceProvider";
import { apiUrl } from "../Shared/Constants";

class UsersList extends Component {
  state = {
    users: [],
    isDropdownOpen: false,
    indexClicked: -1,
  };

  componentDidMount() {
    ServiceProvider.get(apiUrl.users).then((response) => {
      if (response.status === 200) {
        this.setState({ users: response.data.data }, () => {
          console.log(this.state.users);
        });
      }
    });
  }

  handleThreeDotMenu = (index) => {
    this.setState({
      indexClicked: index,
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  render() {
    return (
      <div class="user-data m-b-40">
        <h3 class="title-3 m-b-30">
          <i class="zmdi zmdi-account-calendar"></i>user data
        </h3>
        <div class="filters m-b-45"></div>
        <div class="table-responsive table-data">
          <table class="table">
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
                    <div class="table-data__info">
                      <h6>
                        {user.firstName} {user.lastName}
                      </h6>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <span class="role member">Admin</span>
                    ) : (
                      <span class="role user">User</span>
                    )}
                  </td>
                  <td>
                    {user.isActive ? (
                      <span class="role member">Active</span>
                    ) : (
                      <span class="role admin">Blocked</span>
                    )}
                  </td>
                  <td>
                    <div class="dropdown">
                      <i
                        class="fa fa-ellipsis-v"
                        onClick={() => this.handleThreeDotMenu(index)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      {this.state.indexClicked === index &&
                      this.state.isDropdownOpen ? (
                        <div
                          class="dropdown-menu show"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="#">
                            Action
                          </a>
                          <a class="dropdown-item" href="#">
                            Another action
                          </a>
                          <a class="dropdown-item" href="#">
                            Something else here
                          </a>
                        </div>
                      ) : (
                        <div
                          class="dropdown-menu"
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
      </div>
    );
  }
}

export default UsersList;
