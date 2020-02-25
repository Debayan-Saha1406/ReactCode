import React, { Component } from "react";
import image from "../images/bg-01.jpg";
import {validateEmail} from "../Common/CommonService";

const style = {
  backgroundImage: `url(${image})`
};

class ForgotPassword extends Component {
  state = {
    emailData: {
      email: "",
      className: "input100",
      errorClassName: "wrap-input100 validate-input"
    }
  };

  handlClick = e => {
    e.preventDefault();
  };

  handleChange = (value) => {
    const emailData = { ...this.state.emailData };
    validateEmail(value, emailData);
    this.setState({ emailData });
  };

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-43">
                Forgot Password
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
                    this.handleChange(e.target.value)
                  }
                  value={this.state.emailData.email}
                />
                <span className="focus-input100"></span>
                <span className="label-input100">Email</span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  onClick={e => this.handlClick(e)}
                >
                  Send email
                </button>
              </div>
            </form>

            <div className="login100-more" style={style}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
