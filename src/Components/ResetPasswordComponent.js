import React, { Component } from "react";
import image from "../images/resetPassword.jpg";
import {
  validatePassword,
  validateToken,
  validateEmail,
} from "../Shared/Services/ValidationService";
import PasswordStrengthChecker from "./PasswordStrengthCheckerComponent";
import { Redirect } from "react-router-dom";
import {
  handleEyeIconChange,
  handleDataTypeChange,
  handlePasswordMatchIcon,
  handlePasswordMatchIconColor,
} from "../Shared/Services/PasswordService";
import { handleErrorClassName } from "../Shared/Services/ErrorClassNameService";
import ServiceProvider from "./../Provider/ServiceProvider";
import "../css/forgotPassword.css";
import { apiUrl } from "./../Shared/Constants";
import { ToastContainer } from "react-toastify";
import PopupComponent from "./Common/PopupComponent";
import { toggleLoader } from "../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "./../Provider/LoaderProvider";
import { showErrorMessage } from "../Provider/ToastProvider";

const style = {
  backgroundImage: `url(${image})`,
};

let passwordData, confirmPasswordData;

class ResetPassword extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    resetToken: {
      token: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    passwordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    confirmPasswordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    dataType: "password",
    eyeState: "",
    passwordMatchIcon: "close",
    iconColor: "red",
    redirectToLogin: false,
    passwordMatch: false,
    showRedirectPopup: false,
  };

  handleChange = (name, value) => {
    if (name === "password") {
      this.handlePasswordChange(name, value);
    } else if (name === "resetToken") {
      this.handleTokenChange(name, value);
    } else if (name === "email") {
      this.handleEmailChange(name, value);
    } else {
      this.handleConfirmPasswordChange(name, value);
    }
  };

  handleEmailChange = (name, value) => {
    const emailData = { ...this.state.emailData };
    validateEmail(value, emailData);
    this.setState({ emailData });
  };

  handleTokenChange = (name, value) => {
    const resetToken = { ...this.state.resetToken };
    validateToken(value, resetToken);
    this.setState({ resetToken });
  };

  handlePasswordChange(name, value) {
    passwordData = { ...this.state.passwordData };
    validatePassword(value, passwordData);
    this.setState({ passwordData });
    if (confirmPasswordData) {
      const passwordMatchIcon = handlePasswordMatchIcon(
        passwordData.password,
        confirmPasswordData.password
      );
      const iconColor = handlePasswordMatchIconColor(
        passwordData.password,
        confirmPasswordData.password
      );
      let passwordMatch = this.handlePasswordMatchStatus(iconColor);
      this.setState({ passwordMatchIcon, iconColor, passwordMatch });
    }
  }

  handlePasswordMatchStatus(iconColor) {
    let passwordMatch;
    if (iconColor === "green") {
      passwordMatch = true;
    } else {
      passwordMatch = false;
    }
    return passwordMatch;
  }

  handleConfirmPasswordChange(name, value) {
    confirmPasswordData = { ...this.state.confirmPasswordData };
    validatePassword(value, confirmPasswordData);
    this.setState({ confirmPasswordData });
    if (passwordData) {
      const passwordMatchIcon = handlePasswordMatchIcon(
        passwordData.password,
        confirmPasswordData.password
      );
      const iconColor = handlePasswordMatchIconColor(
        passwordData.password,
        confirmPasswordData.password
      );
      let passwordMatch = this.handlePasswordMatchStatus(iconColor);
      this.setState({ passwordMatchIcon, iconColor, passwordMatch });
    }
  }

  handleOk = () => {
    this.setState({ redirectToLogin: true });
  };

  handleReset = (e) => {
    e.preventDefault();
    const state = { ...this.state };

    state.emailData.errorClassName = handleErrorClassName(
      state.emailData.isErrorExist
    );

    state.resetToken.errorClassName = handleErrorClassName(
      state.resetToken.isErrorExist
    );
    state.passwordData.errorClassName = handleErrorClassName(
      state.passwordData.isErrorExist
    );
    state.confirmPasswordData.errorClassName = handleErrorClassName(
      state.confirmPasswordData.isErrorExist
    );
    console.log(this.state);
    this.setState({ state });

    if (
      !this.state.passwordData.isErrorExist &&
      !this.state.emailData.isErrorExist &&
      !this.state.confirmPasswordData.isErrorExist &&
      !this.state.resetToken.isErrorExist &&
      this.state.passwordMatch
    ) {
      const body = {
        email: this.state.emailData.email,
        token: this.state.resetToken.token,
        newPassword: this.state.passwordData.password,
      };
      this.props.toggleLoader(true, "15%");
      ServiceProvider.post(apiUrl.resetPassword, body).then((response) => {
        if (response.status === 200) {
          this.setState({ showRedirectPopup: true });
          this.props.toggleLoader(false, 1);
        } else {
          showErrorMessage(response.data.errors);
          this.props.toggleLoader(false, 1);
        }
      });
    }
  };

  handleEyeClick = () => {
    const state = { ...this.state };
    const dataType = handleDataTypeChange(state.dataType);
    const eyeState = handleEyeIconChange(state.dataType);
    this.setState({
      dataType,
      eyeState,
    });
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="limiter">
        <div id="loaderContainer">
          <div id="loader">
            {this.props.showLoader && (
              <LoaderProvider visible={this.props.showLoader}></LoaderProvider>
            )}
          </div>
        </div>
        <div
          className="container-login100"
          style={{
            opacity: this.props.screenOpacity,
          }}
        >
          <div className="wrap-login100">
            <form className="login100-form validate-form" id="resetForm">
              <span className="login100-form-title forgot-password">
                Reset Password
              </span>
              <br></br>

              <div
                className={this.state.emailData.errorClassName}
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className={this.state.emailData.className}
                  type="text"
                  name="email"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.emailData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>

              <div
                className={this.state.resetToken.errorClassName}
                data-validate="Recovery Code is required"
              >
                <input
                  className={this.state.resetToken.className}
                  type="text"
                  name="resetToken"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.passwordData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Recovery Code</span>
              </div>

              <div
                className={this.state.passwordData.errorClassName}
                data-validate="Password is required"
              >
                <input
                  className={this.state.passwordData.className}
                  type={this.state.dataType}
                  name="password"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.passwordData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">New Password</span>

                {this.state.passwordData.password.length > 0 && (
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
              {this.state.passwordData.password.length > 0 && (
                <PasswordStrengthChecker
                  password={this.state.passwordData.password}
                ></PasswordStrengthChecker>
              )}
              <div
                className={this.state.confirmPasswordData.errorClassName}
                data-validate="Confirm Password is required"
              >
                <input
                  className={this.state.confirmPasswordData.className}
                  type={this.state.dataType}
                  name="confirmPassword"
                  onChange={(e) =>
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
                  onClick={(e) => this.handleReset(e)}
                >
                  Reset
                </button>
              </div>
              <br></br>
            </form>

            <div className="login100-more" style={style}></div>
          </div>
        </div>
        {this.state.showRedirectPopup && (
          <PopupComponent
            showPopup={this.state.showRedirectPopup}
            togglePopUp={this.handleOk}
            modalTitle="Reset Password Successful"
            modalBody="You will be navigated to Login where you can login with your new password"
            modalOKButtonText="Ok"
            showCancelButton={false}
          ></PopupComponent>
        )}
        {<ToastContainer autoClose={3000}></ToastContainer>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
