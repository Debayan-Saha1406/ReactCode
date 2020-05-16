import React from "react";

const ProfileDetails = (props) => {
  return (
    <form action="" class="user">
      <h4>01. Profile details</h4>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Username</label>
          <input
            type="text"
            placeholder={`${props.firstName}_${props.lastName}`}
          />
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Email Address</label>
          <input
            type="text"
            value={props.email}
            disabled={true}
            id="cursor-not-allowed"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>First Name</label>
          <input type="text" placeholder={props.firstName} />
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Last Name</label>
          <input type="text" placeholder={props.lastName} />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <input class="submit" type="submit" value="Update" />
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
