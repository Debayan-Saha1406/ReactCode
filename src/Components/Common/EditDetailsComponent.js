import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserDetails } from "../../Store/Actions/actionCreator";


class EditDetailsComponent extends Component {
  state = {
    firstName: '',
    lastName: ''
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName
    });
  }

  render() {
    return (
      <React.Fragment>
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputFirstName"
            aria-describedby="emailHelp"
            name="firstName"
            onChange={this.props.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div class="form-group">
          <label >Last Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputLastName"
            onChange={this.props.handleChange}
            name="lastName"
            value={this.state.lastName}
          />
        </div>
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (event) => {
      dispatch(updateUserDetails(event));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDetailsComponent);
