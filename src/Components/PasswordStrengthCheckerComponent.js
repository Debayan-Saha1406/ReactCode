import React, { Component } from "react";
import '../css/passwordChecker.css'

let strengthIndicator;
const tooltip = {
  position: 'relative',
  display: 'inlineBlock',
  borderBottom: '1px dotted black'
}

const tooltipText = {
  visibility: 'hidden',
  width: '120px',
  backgroundColor: 'black',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '6px',
  padding: '5px 0',
  
  /* Position the tooltip */
  position: 'absolute',
  zIndex: '1',
  top: '100%',
  left: '50%',
  marginLeft: '-60px'
}
class PasswordStrengthChecker extends Component {
  state = {
    passwordStrength: {
      0: "Very Weak",
      1: "Weak",
      2: "Medium",
      3: "Strong",
      4: "Very Strong"
    },
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
    debugger;
    let passwordStrengthValue = {};
    const passwordStrength = { ...this.state.passwordStrength };
    let passwordMeter = { ...this.state.passwordMeter };
    if (password.length >= 7) {
      passwordStrengthValue.length = true;
    }

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!passwordStrengthValue.caps && char >= 65 && char <= 90) {
        passwordStrengthValue.caps = true;
      } else if (!passwordStrengthValue.numbers && char >= 48 && char <= 57) {
        passwordStrengthValue.numbers = true;
      } else if (!passwordStrengthValue.small && char >= 97 && char <= 122) {
        passwordStrengthValue.small = true;
      } else if (!passwordStrengthValue.numbers && char >= 48 && char <= 57) {
        passwordStrengthValue.numbers = true;
      } else if (
        (!passwordStrengthValue.special && char >= 33 && char <= 47) ||
        (char >= 58 && char <= 64)
      ) {
        passwordStrengthValue.special = true;
      }
    }

    strengthIndicator = 0;
    for (let metric in passwordStrengthValue) {
      if (passwordStrengthValue[metric] === true) {
        strengthIndicator++;
      }
    }

    console.log(
      "Your password: " +
        password +
        " ( " +
        passwordStrength[strengthIndicator] +
        " )"
    );
    if (strengthIndicator === 0) {
      passwordMeter.width = "0%";
      this.setState({ progressBarColor: "progress-bar-danger" });
    } else if (strengthIndicator === 1) {
      passwordMeter.width = "25%";
      this.setState({ progressBarColor: "progress-bar-danger" });
    } else if (strengthIndicator === 2) {
      passwordMeter.width = "50%";
      this.setState({ progressBarColor: "progress-bar-warning" });
    } else if (strengthIndicator === 3) {
      passwordMeter.width = "75%";
      this.setState({ progressBarColor: "progress-bar-info" });
    } else {
      passwordMeter.width = "100%";
      this.setState({ progressBarColor: "progress-bar-success" });
    }

    this.setState({ passwordStrengthValue, passwordMeter, passwordStrength });
  };

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
              {this.state.passwordStrength[strengthIndicator]}
          </div>
        )}
      </div>
    );
  }
}

export default PasswordStrengthChecker;
