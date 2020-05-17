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
    let isErrorExist = validateInputField(e.target.value);

    setUiState(e, isErrorExist, setData);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (firstName.value === "") {
      setInputFieldError(firstName, setFirstName);
    }
    if (lastName.value === "") {
      setInputFieldError(lastName, setLastName);
    }

    sendUpdateRequest(firstName, lastName, dispatch, props);
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
    <form action="" class="user">
      <h4>01. Profile details</h4>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Email Address</label>
          <input
            type="text"
            value={props.email}
            disabled={true}
            id="cursor-not-allowed"
          />
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Joined On</label>
          <input
            type="text"
            value={props.createdOn}
            disabled={true}
            id="cursor-not-allowed"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 form-it" id="spacing-below">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName.value}
            placeholder={props.firstName}
            onChange={(e) => handleInputChange(e, setFirstName)}
          />
          {firstName.errorClassName === "input-error" && (
            <i class="fa fa-exclamation-circle" id="warning-exclamation"></i>
          )}
        </div>
        <div class="col-md-6 form-it" id="spacing-below">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName.value}
            placeholder={props.lastName}
            onChange={(e) => handleInputChange(e, setLastName)}
          />
          {lastName.errorClassName === "input-error" && (
            <i class="fa fa-exclamation-circle" id="warning-exclamation"></i>
          )}
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <input
            class="submit"
            value="Update"
            onClick={handleUpdate}
            id="black-hover"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;

function sendUpdateRequest(firstName, lastName, dispatch, props) {
  if (!firstName.isErrorExist && !lastName.isErrorExist) {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
    };
    ServiceProvider.put(apiUrl.userInfo, props.userId, body).then(
      (response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          const userDetails = getLocalStorageItem(constants.userDetails);
          userDetails.firstName = firstName.value;
          userDetails.lastName = lastName.value;
          setLocalStorageItem(constants.userDetails, userDetails);
        } else {
          showErrorMessage(response.data.errors);
          dispatch(toggleLoader(false, 1));
        }
      }
    );
  }
}
