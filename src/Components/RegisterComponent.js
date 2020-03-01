import React, { Component } from "react";
import PasswordStrengthChecker from "./PasswordStrengthCheckerComponent";
import image from "../images/bg-01.jpg";
import {
  validateEmail,
  validatePassword,
  validateName
} from "../Common/CommonService";
import { Link } from "react-router-dom";
import "../css/register.css";

const style = {
  backgroundImage: `url(${image})`
};
let passwordData, confirmPasswordData;

class Register extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    nameData: {
      name: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    passwordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    confirmPasswordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    dataType: "password",
    eyeState: "",
    passwordMatchIcon: "close",
    iconColor: "red"
  };

  handleRegister = e => {
    e.preventDefault();
    const emailData = { ...this.state.emailData };
    const passwordData = { ...this.state.passwordData };
    if (emailData.email === "") {
      emailData.errorClassName = "wrap-input100 validate-input alert-validate";
    }
    if (passwordData.password === "") {
      passwordData.errorClassName =
        "wrap-input100 validate-input alert-validate";
    }
    this.setState({ emailData, passwordData });
  };

  handleChange = (name, value) => {
    
    if (name === "email") {
      const emailData = { ...this.state.emailData };
      this.validate(name, value, emailData);
      this.setState({ emailData });
    } else if (name === "password") {
      passwordData = { ...this.state.passwordData };
      this.validate(name, value, passwordData);
      this.setState({ passwordData });
      if (confirmPasswordData) {
        if (passwordData.password === confirmPasswordData.password) {
          this.setState({ passwordMatchIcon: "check"});
        } else {
          this.setState({ passwordMatchIcon: "close" });
        }
      }
    } else if (name === "name") {
      const nameData = { ...this.state.nameData };
      this.validate(name, value, nameData);
      this.setState({ nameData });
    } else {
      confirmPasswordData = { ...this.state.confirmPasswordData };
      this.validate(name, value, confirmPasswordData);
      this.setState({confirmPasswordData});
      if (passwordData) {
        if (passwordData.password === confirmPasswordData.password) {
          this.setState({ passwordMatchIcon: "check", iconColor: "black"});
        } else {
          this.setState({ passwordMatchIcon: "close", iconColor: "red" });
        }
      }
    }
  };

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
    this.setState({
      dataType: state.dataType === "text" ? "password" : "text",
      eyeState: state.dataType === "text" ? "" : "-slash"
    });
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="register-form validate-form">
              <span className="login100-form-title p-b-43">Register</span>

              <div
                className={this.state.nameData.errorClassName}
                data-validate="Name is required"
              >
                <input
                  className={this.state.nameData.className}
                  type="text"
                  name="name"
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.nameData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Name</span>
              </div>

              <div
                className={this.state.emailData.errorClassName}
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className={this.state.emailData.className}
                  type="text"
                  name="email"
                  onChange={e =>
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
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.passwordData.password}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>
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
              <PasswordStrengthChecker
                password={this.state.passwordData.password}
              ></PasswordStrengthChecker>
              <br></br>
              <div
                className={this.state.confirmPasswordData.errorClassName}
                data-validate="Password is required"
              >
                <input
                  className={this.state.confirmPasswordData.className}
                  type={this.state.dataType}
                  name="confirmPassword"
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.confirmPasswordData.password}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Confirm Password</span>
              </div>
              {this.state.confirmPasswordData.password.length > 0 && (
                <React.Fragment>
                  <div className="check-icon">
                    <i
                      className={`fa fa-${this.state.passwordMatchIcon}`}
                      style ={{color: `${this.state.iconColor}`}}
                      aria-hidden="true"
                      onClick={this.handleConfirmPassword}
                    ></i>
                  </div>
                </React.Fragment>
              )}
              {/* confirm password needs to be done here */}
              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={e => this.handleRegister(e)}
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
      </div>
    );
  }
}

export default Register;
