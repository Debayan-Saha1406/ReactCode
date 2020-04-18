import React, { Component } from "react";

class ToggleUserStatus extends Component {
  state = {
    reason: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="form-group">
        <label>Reason</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputFirstName"
          name="reason"
          onChange={this.handleChange}
          value={this.state.reason}
        />
      </div>
    );
  }
}

export default ToggleUserStatus;
