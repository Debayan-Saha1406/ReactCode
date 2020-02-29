import React, { Component } from "react";

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
      width: '0%'
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.password !== prevProps.password) {
      this.checkPassword(this.props.password);
    }
  }

  checkPassword = password => {
    const passwordStrengthValue = { ...this.state.passwordStrengthValue };
    const passwordStrength = {...this.state.passwordStrength};
    let passwordMeter = {...this.state.passwordMeter};
    if (password.length >= 7) {
      passwordStrengthValue.length = true;
    } 


    //Need to reduce it too 
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

    let strengthIndicator = 0;
    for(let metric in passwordStrengthValue) {
    if(passwordStrengthValue[metric] === true) {
         strengthIndicator++;
  }
}

console.log("Your password: " + password + " ( " + passwordStrength[strengthIndicator] + " )");
    if(strengthIndicator === 0)
        passwordMeter.width = '0%' ;
    else if(strengthIndicator === 1)
        passwordMeter.width = '25%' ;
    else if(strengthIndicator === 2)
        passwordMeter.width = '50%' ;
    else if(strengthIndicator === 3)
        passwordMeter.width = '75%' ;
    else 
        passwordMeter.width = '100%' ;

    this.setState({ passwordStrengthValue, passwordMeter, passwordStrength });
  };

  render() {
    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped active"
          role="progressbar"
          aria-valuenow="40"
          aria-valuemin="0"
          aria-valuemax="100"
          style={this.state.passwordMeter}
        >
            Hi
          {/* {this.state.passwordMeter.width <= 20
            ? this.state.passwordStrength.VeryWeak
            : this.state.passwordMeter.width > 20 && this.state.passwordMeter.width <= 40 
            ? this.state.passwordStrength.Weak
            : this.state.passwordMeter.width > 40 && this.state.passwordMeter.width <= 60
            ? this.state.passwordStrength.Medium
            : this.state.passwordMeter.width > 60 && this.state.passwordMeter.width <= 80
            ? this.state.passwordStrength.Strong
            : this.state.passwordStrength.VeryStrong} */}
        </div>
      </div>
    );
  }
}

export default PasswordStrengthChecker;
