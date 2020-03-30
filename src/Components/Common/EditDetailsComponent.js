import React from "react";

const EditDetailsComponent = (props) => {
  return (
    <React.Fragment>
      <div class="form-group">
        <label>First Name</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputFirstName"
          aria-describedby="emailHelp"
          onChange={props.handleChange}
        />
      </div>
      <div class="form-group">
        <label >Last Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputLastName"
          onChange={props.handleChange}
        />
      </div>
    </React.Fragment>
  );
};

export default EditDetailsComponent;
