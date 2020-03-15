import React, { Component } from "react";
import image from "../images/Login.png";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../Shared/Services/ValidationService";
import { constants, InputTypes } from "../Shared/Constants";
import '../css/login.css';
import { handleErrorClassName } from "../Shared/Services/ErrorClassNameService";
import ServiceProvider from "../Shared/Services/ServiceProvider";
import { apiUrl } from './../Shared/Constants';
import { ToastContainer } from 'react-toastify';

const style = {
  backgroundImage: `url(${image})`
};

class Login extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true
    },
    passwordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input",
      isErrorExist: true
    },
    isAdmin: false,
    isRegisteredUser: false,
    rememberMe: false,
    dataType: "password",
    eyeState: ""
  };

  componentDidMount() {
    const userDetails = JSON.parse(localStorage.getItem(constants.userDetails));
    if (userDetails) {
      if (userDetails.rememberMe) {
        const emailData = { ...this.state.emailData };
        const passwordData = { ...this.state.passwordData };
        emailData.email = userDetails.emailData.email;
        emailData.className = "input100 has-val";
        passwordData.password = userDetails.passwordData.password;
        passwordData.className = "input100 has-val";
        this.setState({
          emailData,
          passwordData,
          rememberMe: userDetails.rememberMe
        });
      }
    }
  }

  handleLogin = e => {
    e.preventDefault();
    const state = {...this.state};

    state.emailData.errorClassName = handleErrorClassName(InputTypes.Email,state.emailData.email);
    state.passwordData.errorClassName = handleErrorClassName(InputTypes.Password,  state.passwordData.password);

    this.setState({ state });

    localStorage.setItem(constants.userDetails, JSON.stringify(this.state));
    console.log(this.state);
    if(!this.state.emailData.isErrorExist &&  !this.state.passwordData.isErrorExist){
      alert("LoggedIn");
    }

    //Sample API Call For Reference
    ServiceProvider
      .get(apiUrl.users)
      .then((response) => {
      });


    // if (this.state.emailData.email === "admin@gmail.com" && this.state.passwordData.password === "admin") {
    //   this.setState({isAdmin : true})
    // }
    // else{
    //   this.setState({isRegisteredUser : true})
    // }
  };

  handleChange = (name, value) => {
    if (name === "email") {
      const emailData = { ...this.state.emailData };
      this.validate(name, value, emailData);
    } else {
      const passwordData = { ...this.state.passwordData };
      this.validate(name, value, passwordData);
    }
  };

  validate(name, value, data) {
    if (name === "email") {
      validateEmail(value, data);
      this.setState({ emailData: data });
    } else {
      validatePassword(value, data);
      this.setState({ passwordData: data });
    }
  }

  handleCheckboxChange = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  handleEyeClick = () => {
    const state = { ...this.state };
    this.setState({
      dataType: state.dataType === "text" ? "password" : "text",
      eyeState: state.dataType === "text" ? "" : "-slash"
    });
  };


  render() {
    if (this.state.isAdmin) {
      return <Redirect to="/admin" />;
    }

    if (this.state.isRegisteredUser) {
      return <Redirect to="/user" />;
    }
    return (
      <div className="limiter">
       
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43">
                Login to continue
              </span>

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
              
              {this.state.passwordData.password.length > 0  && <React.Fragment> 
                <div className="eyeIcon"><i
                className={`fa fa-eye${this.state.eyeState}`}
                
                aria-hidden="true"
                onClick={this.handleEyeClick}
              ></i>
              </div>
              
              </React.Fragment>
              
              }
              </div>
              <br></br>
              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    checked={this.state.rememberMe}
                    type="checkbox"
                    name="remember-me"
                    onChange={this.handleCheckboxChange}
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div>
                  <Link to={"/forgotPassword"} className="txt1">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={e => this.handleLogin(e)}
                >
                  Login
                </button>
              </div>
              <br></br>
              <div className="container-login100-form-btn">
              <Link to={"/register"} className="register">
                <button
                  className="register-form-btn"
                >
                  Register
                </button>
                </Link>
                {<ToastContainer autoClose={8000} />}
              </div>
            </form>

            <div className="login100-more" style={style}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
