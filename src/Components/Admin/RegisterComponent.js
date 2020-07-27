import React, { Component } from "react";
import PasswordStrengthChecker from "./PasswordStrengthCheckerComponent";
import image from "../../images/RegisterButton.jpg";
import {
  validateEmail,
  validatePassword,
  validateName,
  handleLastName,
} from "../../Shared/Services/ValidationService";
import { Link, Redirect } from "react-router-dom";
import "../../css/register.css";
import "../../css/main.css";
import "../../css/util.css";
import "../../css/login.css";
import "../../css/passwordChecker.css";
import "../../css/forgotPassword.css";
import "../../../src/vendor/bootstrap/css/bootstrap.min.css";
import {
  handleEyeIconChange,
  handleDataTypeChange,
  handlePasswordMatchIcon,
  handlePasswordMatchIconColor,
} from "../../Shared/Services/PasswordService";

import { handleErrorClassName } from "../../Shared/Services/ErrorClassNameService";
import {
  apiUrl,
  constants,
  userStatus,
  userRole,
} from "../../Shared/Constants";
import ServiceProvider from "../../Provider/ServiceProvider";
import { ToastContainer } from "react-toastify";
import { showErrorMessage } from "../../Provider/ToastProvider";
import { toggleLoader, saveUserData } from "../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "../../Provider/LoaderProvider";
import { setLocalStorageItem } from "../../Provider/LocalStorageProvider";
import PopupComponent from "../Admin/Common/PopupComponent";

const style = {
  backgroundImage: `url(${image})`,
};
let passwordData, confirmPasswordData;

class Register extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    firstNameData: {
      name: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
    },
    lastNameData: {
      name: "",
      className: "input100",
      errorClassName: "wrap-input100",
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
    hasPasswordError: true,
    showRedirectPopup: false,
    redirectToHome: false,
    redirectToAdmin: false,
  };

  handleRegister = (e) => {
    e.preventDefault();
    const state = { ...this.state };
    state.firstNameData.errorClassName = handleErrorClassName(
      state.firstNameData.isErrorExist
    );

    state.emailData.errorClassName = handleErrorClassName(
      state.emailData.isErrorExist
    );
    state.passwordData.errorClassName = handleErrorClassName(
      state.passwordData.isErrorExist
    );
    state.confirmPasswordData.errorClassName = handleErrorClassName(
      state.confirmPasswordData.isErrorExist
    );

    this.setState({ state }, () => {
      this.sendRegisterRequest();
    });
  };

  handleChange = (name, value) => {
    if (name === "email") {
      this.handleEmailChange(name, value);
    } else if (name === "password") {
      this.handlePasswordChange(name, value);
    } else if (name === "firstName") {
      this.handleFirstName(name, value);
    } else if (name === "lastName") {
      this.handleLastName(name, value);
    } else {
      this.handleConfirmPasswordChange(name, value);
    }
  };

  sendRegisterRequest() {
    if (
      !this.state.emailData.isErrorExist &&
      !this.state.passwordData.isErrorExist &&
      !this.state.firstNameData.isErrorExist &&
      !this.state.confirmPasswordData.isErrorExist &&
      !this.state.hasPasswordError
    ) {
      const body = {
        email: this.state.emailData.email.trim(),
        password: this.state.passwordData.password.trim(),
        firstName: this.state.firstNameData.name.trim(),
        lastName:
          this.state.lastNameData.name.trim() === ""
            ? null
            : this.state.lastNameData.name.trim(),
        profileImageUrl: this.props.location.state
          ? this.props.location.state.response.imageUrl
          : null,
        userStatusId: userStatus.pending,
        roleId: userRole.admin,
      };
      this.props.toggleLoader(true, "15%");
      ServiceProvider.post(apiUrl.register, body).then((response) => {
        if (response.status === 200) {
          this.props.toggleLoader(false, 1);
          if (this.props.location.state) {
            this.handleLogin(); //Directly Login Google Sign In User
          } else {
            this.setState({ showRedirectPopup: true }); //Take to Login Page
          }
        } else {
          showErrorMessage(response.data.errors);
          this.props.toggleLoader(false, 1);
        }
      });
    }
  }

  handleLogin() {
    const body = {
      email: this.state.emailData.email,
      password: this.state.passwordData.password,
    };
    ServiceProvider.post(apiUrl.login, body).then((response) => {
      if (response.status === 200) {
        if (response.data.data.isAdmin) {
          this.setState({ redirectToAdmin: true }, () => {
            if (response.data.data.profileImageUrl === null) {
              response.data.data.profileImageUrl = this.props.location.state.response.imageUrl; //Set The Default Gmail Image
            }
            setLocalStorageItem(constants.userDetails, response.data.data);
            setLocalStorageItem(constants.loginDetails, {
              email: this.state.emailData.email,
              password: this.state.passwordData.password,
            });
            this.props.saveUserData(response.data.data);
            this.props.toggleLoader(false, 1);
          });
        }
      }
    });
  }

  handleConfirmPasswordChange(name, value) {
    confirmPasswordData = { ...this.state.confirmPasswordData };
    this.validate(name, value, confirmPasswordData);
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

      let hasPasswordError;
      if (iconColor === "green") {
        hasPasswordError = false;
      } else {
        hasPasswordError = true;
      }
      this.setState({ passwordMatchIcon, iconColor, hasPasswordError });
    }
  }

  handleFirstName(name, value) {
    const firstNameData = { ...this.state.firstNameData };
    this.validate(name, value, firstNameData);
    this.setState({ firstNameData });
  }

  handleLastName(name, value) {
    const lastNameData = { ...this.state.lastNameData };
    handleLastName(value, lastNameData);
    this.setState({ lastNameData });
  }

  handlePasswordChange(name, value) {
    passwordData = { ...this.state.passwordData };
    this.validate(name, value, passwordData);
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
      let hasPasswordError;
      if (iconColor === "green") {
        hasPasswordError = false;
      } else {
        hasPasswordError = true;
      }
      this.setState({ passwordMatchIcon, iconColor, hasPasswordError });
    }
  }

  handleEmailChange(name, value) {
    const emailData = { ...this.state.emailData };
    this.validate(name, value, emailData);
    this.setState({ emailData });
  }

  validate(name, value, data) {
    if (name === "email") {
      validateEmail(value, data);
    } else if (name === "password" || name === "confirmPassword") {
      validatePassword(value, data);
    } else {
      validateName(value, data);
    }
  }

  handleEyeClick = () => {
    const state = { ...this.state };
    const dataType = handleDataTypeChange(state.dataType);
    const eyeState = handleEyeIconChange(state.dataType);
    this.setState({
      dataType,
      eyeState,
    });
  };

  handleRedirect = () => {
    this.setState({ redirectToHome: true });
  };

  componentDidMount() {
    if (this.props.location.state) {
      const state = { ...this.state };
      const { email, firstName, lastName } = this.props.location.state.response;
      this.setGoogleSignInValues(state, email, firstName, lastName);
      this.setState({ state });
    }
  }

  setGoogleSignInValues(state, email, firstName, lastName) {
    state.emailData.email = email;
    state.emailData.className = "input100 has-val";
    state.emailData.errorClassName = "wrap-input100 validate-input";
    state.emailData.isErrorExist = false;

    state.firstNameData.name = firstName;
    state.firstNameData.className = "input100 has-val";
    state.firstNameData.errorClassName = "wrap-input100 validate-input";
    state.firstNameData.isErrorExist = false;

    state.lastNameData.name = lastName;
    state.lastNameData.className = "input100 has-val";
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/home"></Redirect>;
    }

    if (this.state.redirectToAdmin) {
      return <Redirect to="/admin"></Redirect>;
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
            <form className="register-form validate-form">
              <span className="login100-form-title p-b-43">Register</span>
              <div
                className={this.state.firstNameData.errorClassName}
                data-validate="First Name is required"
              >
                <input
                  className={this.state.firstNameData.className}
                  type="text"
                  name="firstName"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.firstNameData.name}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">First Name</span>
              </div>

              <div className={this.state.lastNameData.errorClassName}>
                <input
                  className={this.state.lastNameData.className}
                  type="text"
                  name="lastName"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.lastNameData.name}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Last Name</span>
              </div>

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
                  value={this.state.passwordData.password}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>

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
                data-validate="Password is required"
              >
                <input
                  className={this.state.confirmPasswordData.className}
                  type={this.state.dataType}
                  name="confirmPassword"
                  onChange={(e) =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.confirmPasswordData.password}
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
                  onClick={(e) => this.handleRegister(e)}
                >
                  Register
                </button>
              </div>
              <br></br>
              <div align="center">
                Already have an account. <Link to={"/login"}>Login here</Link>
              </div>
            </form>
            <div className="login100-more" style={style}></div>
          </div>
        </div>
        {this.state.showRedirectPopup && (
          <PopupComponent
            modalTitle="Registration Pending Approval"
            modalBody="You will now be navigated to home page of the website. You can login once admin approves ur registration as an admin."
            modalOKButtonText="OK"
            showCancelButton={false}
            showPopup={this.state.showRedirectPopup}
            togglePopUp={this.handleRedirect}
          ></PopupComponent>
        )}

        {<ToastContainer autoClose={8000} />}
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
    saveUserData: (userData) => {
      dispatch(saveUserData(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
