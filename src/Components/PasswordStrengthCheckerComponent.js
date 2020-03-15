import React, { Component } from "react";
import '../css/passwordChecker.css';
import { constants } from "../Shared/Constants";

let strengthIndicator;
class PasswordStrengthChecker extends Component {
  state = {
    passwordStrengthValue: {
      caps: false,
      length: false,
      special: false,
      numbers: false,
      small: false
    },
    passwordMeter: {
      width: "0%"
    },
    progressBarColor: "progress-bar-danger"
  };

  componentDidUpdate(prevProps) {
    if (this.props.password !== prevProps.password) {
      this.checkPassword(this.props.password);
    }
  }

  checkPassword = password => {
    let passwordStrengthValue = {};
    let passwordMeter = { ...this.state.passwordMeter };

    this.setPasswordStrengthValue(password, passwordStrengthValue);
    this.setStrengthIndicator(passwordStrengthValue);
    this.setProgressBarColor(passwordMeter);

    this.setState({ passwordStrengthValue, passwordMeter });
  };

  setStrengthIndicator(passwordStrengthValue) {
    strengthIndicator = 0;
    for (let metric in passwordStrengthValue) {
      if (passwordStrengthValue[metric] === true) {
        strengthIndicator++;
      }
    }
  }

  setPasswordStrengthValue(password, passwordStrengthValue) {
    if (password.length >= 7) {
      passwordStrengthValue.length = true;
    }
    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!passwordStrengthValue.caps && char >= 65 && char <= 90) {
        passwordStrengthValue.caps = true;
      }
      else if (!passwordStrengthValue.numbers && char >= 48 && char <= 57) {
        passwordStrengthValue.numbers = true;
      }
      else if (!passwordStrengthValue.small && char >= 97 && char <= 122) {
        passwordStrengthValue.small = true;
      }
      else if (!passwordStrengthValue.numbers && char >= 48 && char <= 57) {
        passwordStrengthValue.numbers = true;
      }
      else if ((!passwordStrengthValue.special && char >= 33 && char <= 47) ||
        (char >= 58 && char <= 64)) {
        passwordStrengthValue.special = true;
      }
    }
  }

  setProgressBarColor(passwordMeter) {
    if (strengthIndicator === 0) {
      passwordMeter.width = "0%";
      this.setState({ progressBarColor: "progress-bar-danger" });
    }
    else if (strengthIndicator === 1) {
      passwordMeter.width = "20%";
      this.setState({ progressBarColor: "progress-bar-danger" });
    }
    else if (strengthIndicator === 2) {
      passwordMeter.width = "40%";
      this.setState({ progressBarColor: "progress-bar-danger-warning" });
    }
    else if (strengthIndicator === 3) {
      passwordMeter.width = "60%";
      this.setState({ progressBarColor: "progress-bar-warning" });
    }
    else if (strengthIndicator === 4) {
      passwordMeter.width = "80%";
      this.setState({ progressBarColor: "progress-bar-info" });
    }
    else {
      passwordMeter.width = "100%";
      this.setState({ progressBarColor: "progress-bar-success" });
    }
  }

  render() {
    return (
      <div className="progress">
        {this.props.password.length > 0 && (
          <div
            className={`progress-bar progress-bar-striped ${this.state.progressBarColor}`}
            role="progressbar"
            aria-valuenow="40"
            aria-valuemin="0"
            aria-valuemax="100"
            style={this.state.passwordMeter}
          >
              {constants.passwordStrength[strengthIndicator]}
          </div>
        )}
      </div>
     
    );
  }
}

export default PasswordStrengthChecker;
