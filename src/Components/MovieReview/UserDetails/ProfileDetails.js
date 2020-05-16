import React from "react";

const ProfileDetails = () => {
  return (
    <form action="" class="user">
      <h4>01. Profile details</h4>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Username</label>
          <input type="text" placeholder="edwardkennedy" />
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Email Address</label>
          <input type="text" placeholder="edward@kennedy.com" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>First Name</label>
          <input type="text" placeholder="Edward " />
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Last Name</label>
          <input type="text" placeholder="Kennedy" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Country</label>
          <select>
            <option value="united">United States</option>
            <option value="saab">Others</option>
          </select>
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>State</label>
          <select>
            <option value="united">New York</option>
            <option value="saab">Others</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <input class="submit" type="submit" value="save" />
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
