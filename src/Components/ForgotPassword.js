import React, { Component } from "react";
import image from "../images/forgotPassword.png";
import { validateEmail } from "../Shared/Services/ValidationService";
import { Link, Redirect } from "react-router-dom";
import "../css/forgotPassword.css";
import ServiceProvider from "./../Provider/ServiceProvider";
import { apiUrl } from "./../Shared/Constants";
import { ToastContainer } from "react-toastify";
import { showErrorMessage } from "../Provider/ToastProvider";
import { showSuccessMessage } from "./../Provider/ToastProvider";
import PopupComponent from "./Common/PopupComponent";
import { toggleLoader } from "../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "./../Provider/LoaderProvider";

const style = {
  backgroundImage: `url(${image})`,
};

class ForgotPassword extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true,
    },
    redirectToReset: false,
    showRedirectPopup: false,
  };

  handlClick = (e) => {
    e.preventDefault();
    const state = { ...this.state };
    if (state.emailData.email === "") {
      state.emailData.errorClassName =
        "wrap-input100 validate-input alert-validate";
    }
    this.setState({ state });

    if (!this.state.emailData.isErrorExist) {
      const body = {
        email: this.state.emailData.email,
      };
      this.props.toggleLoader(true, "15%");
      ServiceProvider.post(apiUrl.forgotPassword, body).then((response) => {
        if (response.status === 200) {
          if (!response) {
            showErrorMessage("Mail Not Sent Due To Technical Issue");
            this.props.toggleLoader(false, 1);
          } else {
            this.setState({ showRedirectPopup: true });
            this.props.toggleLoader(false, 1);
          }
        } else {
          showErrorMessage(response.data.errors);
          this.props.toggleLoader(false, 1);
        }
      });
    }
  };

  handleChange = (value) => {
    const emailData = { ...this.state.emailData };
    validateEmail(value, emailData);
    this.setState({ emailData });
  };

  handleOk = () => {
    this.setState({ redirectToReset: true });
  };

  render() {
    if (this.state.redirectToReset) {
      return <Redirect to="/resetPassword"></Redirect>;
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
            <form className="login100-form validate-form">
              <span className="login100-form-title forgot-password">
                Forgot Password
              </span>
              <div>
                To recover your password, you need to enter your registered
                email address. We will sent the recovery code to your email.
              </div>
              <br></br>
              <div
                className={this.state.emailData.errorClassName}
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className={this.state.emailData.className}
                  type="text"
                  name="email"
                  onChange={(e) => this.handleChange(e.target.value)}
                  value={this.state.emailData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={(e) => this.handlClick(e)}
                >
                  Send email
                </button>
              </div>
              <br></br>
              <div align="center">
                <Link to={"/login"}>Click here To Go Back To Login </Link>
              </div>
            </form>

            <div className="login100-more" style={style}></div>
          </div>
        </div>
        {<ToastContainer autoClose={3000}></ToastContainer>}
        {this.state.showRedirectPopup && (
          <PopupComponent
            showPopup={this.state.showRedirectPopup}
            togglePopUp={this.handleOk}
            modalTitle="Reset Password"
            modalBody="Your Password Reset Email Has Been Sent. Please Check Your Inbox To Continue."
            modalOKButtonText="Ok"
            showCancelButton={false}
          ></PopupComponent>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
