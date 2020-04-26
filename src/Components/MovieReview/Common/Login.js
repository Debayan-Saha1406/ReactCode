/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Login extends Component {
  state = {};

  render() {
    return (
      <div className={`overlay ${this.props.loginPopupClassName}`}>
        <div className="login-wrapper" id="login-content">
          <div className="login-content">
            <a
              className="close"
              data-ol-has-click-handler=""
              onClick={this.props.closeLoginPopup}
              style={{ cursor: "pointer" }}
            >
              x
            </a>
            <h3>Login</h3>
            <form method="post" action="login.php">
              <div className="row">
                <label htmlFor="username">
                  Username:
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Hugh Jackman"
                    pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$"
                    required="required"
                  />
                </label>
              </div>

              <div className="row">
                <label htmlFor="password">
                  Password:
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="******"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required="required"
                  />
                </label>
              </div>
              <div className="row">
                <div className="remember">
                  <div>
                    <input
                      type="checkbox"
                      name="remember"
                      value="Remember me"
                    />
                    <span>Remember me</span>
                  </div>
                  <div className="right"></div>
                  <a className="forgot" href="#">
                    Forget password ?
                  </a>
                </div>
              </div>
              <div className="row">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
