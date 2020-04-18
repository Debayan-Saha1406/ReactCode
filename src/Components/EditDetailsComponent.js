import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInputChange } from "../Store/Actions/actionCreator";
import "../css/sideBar.css";

class EditDetailsComponent extends Component {
  state = {
    firstName: "",
    lastName: "",
  };

  componentDidMount() {
    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.handleChange(this.state);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputFirstName"
            aria-describedby="emailHelp"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputLastName"
            onChange={this.handleChange}
            name="lastName"
            value={this.state.lastName}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (state) => {
      dispatch(handleInputChange(state));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDetailsComponent);
