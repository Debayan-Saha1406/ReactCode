import React, { Component } from "react";
import "../css/util.css";
import "../css/main.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/animsition/css/animsition.min.css";
import "../vendor/select2/select2.min.css";
import "../vendor/daterangepicker/daterangepicker.css";
import image from "../images/bg-01.jpg";

import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import {validateEmail, validatePassword} from "../Common/CommonService";

const style = {
  backgroundImage: `url(${image})`
};

class Login extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    passwordData: {
      password: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    },
    isAdmin : false,
    isRegisteredUser: false
  };

  handleLogin = (e) => {
    e.preventDefault();
    const emailData = { ...this.state.emailData };
    const passwordData = {...this.state.passwordData};
    if(emailData.email === "")
    {
        emailData.errorClassName = "wrap-input100 validate-input alert-validate";
    }
    if(passwordData.password === "")
    {
        passwordData.errorClassName = "wrap-input100 validate-input alert-validate";
    }
    this.setState({emailData, passwordData});
    if (this.state.emailData.email === "admin@gmail.com" && this.state.passwordData.password === "admin") {
      this.setState({isAdmin : true})
    }
    else{
      this.setState({isRegisteredUser : true})
    }
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


  render() {
    if (this.state.isAdmin) {
      return <Redirect to='/admin' />
    }

    if(this.state.isRegisteredUser){
      return <Redirect to="/user"/>
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
                  type="password"
                  name="password"
                  onChange={e =>
                    this.handleChange(e.target.name, e.target.value)
                  }
                  value={this.state.passwordData.password}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Password</span>
              </div>

              <div className="flex-sb-m w-full p-t-3 p-b-32">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>

                <div>
                  <Link to = {'/forgotPassword'} className="txt1">
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

              <div className="text-center p-t-46 p-b-20">
                <span className="txt2">or sign up using</span>
              </div>

              <div className="login100-form-social flex-c-m">
                <a
                  href="#"
                  className="login100-form-social-item flex-c-m bg1 m-r-5"
                >
                  <i className="fa fa-facebook-f" aria-hidden="true"></i>
                </a>

                <a
                  href="#"
                  className="login100-form-social-item flex-c-m bg2 m-r-5"
                >
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
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
