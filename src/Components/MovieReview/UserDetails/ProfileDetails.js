import React, { useState } from "react";
import { validateInputField } from "../../../Shared/Services/ValidationService";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl, constants } from "./../../../Shared/Constants";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "./../../../Provider/LocalStorageProvider";

const profileState = {
  value: "",
  errorClassName: "",
  isErrorExist: true,
};

const ProfileDetails = (props) => {
  const [firstName, setFirstName] = useState(profileState);
  const [lastName, setLastName] = useState(profileState);
  const dispatch = useDispatch();

  const handleInputChange = (e, setData) => {
    let isErrorExist;
    if (e.target.name === "firstName") {
      isErrorExist = validateInputField(e.target.value);
    }
    setUiState(e, isErrorExist, setData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (firstName.value === "") {
      setInputFieldError(firstName, setFirstName);
    }
    props.sendUpdateRequest(firstName, lastName);
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  const setUiState = (e, isErrorExist, setData) => {
    if (isErrorExist) {
      setData({
        ...[e.target.name],
        isErrorExist: true,
        value: e.target.value,
        errorClassName: "input-error",
      });
    } else {
      setData({
        ...[e.target.name],
        isErrorExist: false,
        value: e.target.value,
        errorClassName: "",
      });
    }
  };

  return (
    <form action="" className="user">
      <h4>01. Profile details</h4>
      <div className="row">
        <div className="col-md-6 form-it" id="spacing-below">
          <label>Email Address</label>
          <input
            type="text"
            value={props.email}
            disabled={true}
            id="cursor-not-allowed"
          />
        </div>
        <div className="col-md-6 form-it" id="spacing-below">
          <label>Joined On</label>
          <input
            type="text"
            value={props.createdOn.substring(0, props.createdOn.indexOf("T"))}
            disabled={true}
            id="cursor-not-allowed"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-it" id="spacing-below">
          <label className="required-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName.value}
            placeholder="Enter updated First Name"
            onChange={(e) => handleInputChange(e, setFirstName)}
          />
          {firstName.errorClassName === "input-error" && (
            <i
              className="fa fa-exclamation-circle"
              id="warning-exclamation"
            ></i>
          )}
        </div>
        <div className="col-md-6 form-it" id="spacing-below">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName.value}
            placeholder="Enter updated Last Name"
            onChange={(e) => handleInputChange(e, setLastName)}
          />
          {lastName.errorClassName === "input-error" && (
            <i
              className="fa fa-exclamation-circle"
              id="warning-exclamation"
            ></i>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <input
            className="submit"
            onClick={handleUpdate}
            id="black-hover"
            style={{ cursor: "pointer", paddingLeft: "20px" }}
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
