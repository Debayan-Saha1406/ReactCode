/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Register extends Component {
  state = {};
  render() {
    return (
      <div className={`overlay ${this.props.registerPopupClassName}`}>
        <div className="login-wrapper" id="signup-content">
          <div className="login-content">
            <a
              className="close"
              onClick={this.props.closeRegisterPopup}
              style={{ cursor: "pointer" }}
            >
              x
            </a>
            <h3>sign up</h3>
            <form method="post" action="signup.php">
              <div className="row">
                <label htmlFor="username-2">
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

              <div className="row">
                <label htmlFor="email-2">
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
              <div className="row">
                <label htmlFor="password-2">
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
              <div className="row">
                <label htmlFor="repassword-2">
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
              <div className="row">
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
