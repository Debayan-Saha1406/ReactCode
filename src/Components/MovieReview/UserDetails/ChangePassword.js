import React from "react";

const ChangePassword = () => {
  return (
    <form action="" class="password">
      <h4>02. Change password</h4>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Old Password</label>
          <input type="text" placeholder="**********" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>New Password</label>
          <input type="text" placeholder="***************" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Confirm New Password</label>
          <input type="text" placeholder="*************** " />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <input class="submit" type="submit" value="change" />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
