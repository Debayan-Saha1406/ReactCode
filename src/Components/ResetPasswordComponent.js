import React, { Component } from "react";
import image from "../images/resetPassword.jpg";
import { validatePassword } from "../Common/CommonService";
import PasswordStrengthChecker from "./PasswordStrengthCheckerComponent";
import { Redirect } from "react-router-dom";

const style = {
  backgroundImage: `url(${image})`
};

let newPasswordData, confirmPasswordData;

class ResetPassword extends Component {
  state = {
    newPasswordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true
    },
    confirmPasswordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true
    },
    dataType: "password",
    eyeState: "",
    passwordMatchIcon: "close",
    iconColor: "red",
    redirectToLogin : false
  };

  handleChange = (name, value) => {
    if (name === "password") {
        this.handlePasswordChange(name, value);
    } else {
      this.handleConfirmPasswordChange(name, value);
    }
  };

  handlePasswordChange(name, value) {
    newPasswordData = { ...this.state.newPasswordData };
    this.validate(name, value, newPasswordData);
    this.setState({ newPasswordData });
    if (confirmPasswordData) {
      if (newPasswordData.password === confirmPasswordData.password) {
        this.setState({ passwordMatchIcon: "check", iconColor: "green" });
      } else {
        this.setState({ passwordMatchIcon: "close", iconColor: "red" });
      }
    }
  }

  validate(name, value, data) {
    validatePassword(value, data);
  }


  handleConfirmPasswordChange(name, value) {
     confirmPasswordData = { ...this.state.confirmPasswordData };
    this.validate(name, value, confirmPasswordData);
    this.setState({ confirmPasswordData });
    if (newPasswordData) {
      if (newPasswordData.password === confirmPasswordData.password) {
        this.setState({ passwordMatchIcon: "check", iconColor: "green" });
      } else {
        this.setState({ passwordMatchIcon: "close", iconColor: "red" });
      }
    }
  }

  handleReset = e => {
    e.preventDefault();
    const state = { ...this.state };
    if (state.newPasswordData.password === "") {
      state.newPasswordData.errorClassName =
        "wrap-input100 validate-input alert-validate";
    }

    if (state.confirmPasswordData.password === "") {
      state.confirmPasswordData.errorClassName =
        "wrap-input100 validate-input alert-validate";
    }

    this.setState({ state });

    if(this.state.iconColor !== "green"){
        alert("Passwords Do Not Match")
    }
    else if(!this.state.newPasswordData.isErrorExist &&  !this.state.confirmPasswordData.isErrorExist){
       this.setState({redirectToLogin : true})
      }
   
  };

  handleEyeClick = () => {
    const state = { ...this.state };
    this.setState({
      dataType: state.dataType === "text" ? "password" : "text",
      eyeState: state.dataType === "text" ? "" : "-slash"
    });
  };

  render() {
      if(this.state.redirectToLogin){
        return <Redirect to = "/login"></Redirect>
      }
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title forgot-password">
                Reset Password
              </span>
              <br></br>
              <div
                className={this.state.newPasswordData.errorClassName}
                data-validate="Password is required"
              >
                <input
                  className={this.state.newPasswordData.className}
                  type={this.state.dataType}
                  name="password"
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.newPasswordData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">New Password</span>

                {this.state.newPasswordData.password.length > 0 && (
                  <React.Fragment>
                    <div className="eye-icon">
                      <i
                        className={`fa fa-eye${this.state.eyeState}`}
                        aria-hidden="true"
                        onClick={this.handleEyeClick}
                      ></i>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <PasswordStrengthChecker
                password={this.state.newPasswordData.password}
              ></PasswordStrengthChecker>
              <div
                className={this.state.confirmPasswordData.errorClassName}
                data-validate="Confirm Password is required"
              >
                <input
                  className={this.state.confirmPasswordData.className}
                  type={this.state.dataType}
                  name="confirmPassword"
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.confirmPasswordData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Confirm Password</span>

                {this.state.confirmPasswordData.password.length > 0 && (
                  <React.Fragment>
                    <div className="check-icon">
                      <i
                        className={`fa fa-${this.state.passwordMatchIcon}`}
                        style={{ color: `${this.state.iconColor}` }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </React.Fragment>
                )}
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={e => this.handleReset(e)}
                >
                  Reset
                </button>
              </div>
              <br></br>
            </form>

            <div className="login100-more" style={style}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
