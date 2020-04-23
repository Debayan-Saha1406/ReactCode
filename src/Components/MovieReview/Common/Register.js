/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Register extends Component {
  state = {};
  render() {
    return (
      <div class={`overlay ${this.props.registerPopupClassName}`}>
        <div class="login-wrapper" id="signup-content">
          <div class="login-content">
            <a
              class="close"
              onClick={this.props.closeRegisterPopup}
              style={{ cursor: "pointer" }}
            >
              x
            </a>
            <h3>sign up</h3>
            <form method="post" action="signup.php">
              <div class="row">
                <label for="username-2">
                  Username:
                  <br></br>
                  <input
                    id="input"
                    type="text"
                    name="username"
                    placeholder="Hugh Jackman"
                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$"
                    required="required"
                  />
                </label>
              </div>

              <div class="row">
                <label for="email-2">
                  your email:
                  <br></br>
                  <input
                    id="input"
                    type="password"
                    name="email"
                    placeholder=""
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required="required"
                  />
                </label>
              </div>
              <div class="row">
                <label for="password-2">
                  Password:
                  <br></br>
                  <input
                    id="input"
                    type="password"
                    name="password"
                    placeholder=""
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required="required"
                  />
                </label>
              </div>
              <div class="row">
                <label for="repassword-2">
                  re-type Password:
                  <input
                    id="input"
                    type="password"
                    name="password"
                    placeholder=""
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required="required"
                  />
                </label>
              </div>
              <div class="row">
                <button type="submit">sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
