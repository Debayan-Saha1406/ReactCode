import React, { useState } from "react";
import { validateInputField } from "../../../Shared/Services/ValidationService";
import { useDispatch } from "react-redux";
import {
  toggleLoader,
  togglePopup,
  saveUserInfo,
} from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl, popupType } from "./../../../Shared/Constants";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { clearLocalStorage } from "../../../Provider/LocalStorageProvider";

const passwordState = {
  value: "",
  errorClassName: "",
  isErrorExist: true,
};
const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState(passwordState);
  const [newPassword, setNewPassword] = useState(passwordState);
  const [confirmPassword, setConfirmPassword] = useState(passwordState);
  const dispatch = useDispatch();

  const handleInputChange = (e, setData) => {
    let isErrorExist = validateInputField(e.target.value);

    setUiState(e, isErrorExist, setData);
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

  const clearValues = () => {
    setOldPassword(passwordState);
    setNewPassword(passwordState);
    setConfirmPassword(passwordState);
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (oldPassword.value === "") {
      setInputFieldError(oldPassword, setOldPassword);
    }
    if (newPassword.value === "") {
      setInputFieldError(newPassword, setNewPassword);
    }
    if (confirmPassword.value === "") {
      setInputFieldError(confirmPassword, setConfirmPassword);
    }

    if (newPassword.value !== confirmPassword.value) {
      setInputFieldError(confirmPassword, setConfirmPassword);
    }

    if (
      !oldPassword.isErrorExist &&
      !newPassword.isErrorExist &&
      !confirmPassword.isErrorExist &&
      newPassword.value === confirmPassword.value
    ) {
      dispatch(toggleLoader(true, "15%"));
      const body = {
        email: props.email,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      };
      ServiceProvider.post(apiUrl.changePassword, body).then((response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          clearValues();
          props.showInformation(
            "Password Changed Successfully",
            "You Will Now Need To Login With Your New Password"
          );

          dispatch(togglePopup("openform", popupType.information));
          clearLocalStorage();
        } else {
          showErrorMessage(response.data.errors);
          dispatch(toggleLoader(false, 1));
        }
      });
    }
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  return (
    <form action="" className="password">
      <h4>02. Change password</h4>
      <div className="row">
        <div className="col-md-6 form-it" id="spacing-below">
          <label className="required-label">Old Password</label>
          <input
            type="text"
            name="oldPassword"
            value={oldPassword.value}
            placeholder="Enter Old Password"
            onChange={(e) => handleInputChange(e, setOldPassword)}
          />
          {oldPassword.errorClassName === "input-error" && (
            <i
              className="fa fa-exclamation-circle"
              id="warning-exclamation"
            ></i>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-it" id="spacing-below">
          <label className="required-label">New Password</label>
          <input
            type="text"
            name="newPassword"
            placeholder="Enter New Password"
            value={newPassword.value}
            onChange={(e) => handleInputChange(e, setNewPassword)}
          />
          {newPassword.errorClassName === "input-error" && (
            <i
              className="fa fa-exclamation-circle"
              id="warning-exclamation"
            ></i>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-it" id="spacing-below">
          <label className="required-label">Confirm New Password</label>
          <input
            type="text"
            name="confirmPassword"
            value={confirmPassword.value}
            placeholder="Confirm Your Password"
            onChange={(e) => handleInputChange(e, setConfirmPassword)}
          />
          {confirmPassword.errorClassName === "input-error" && (
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
            type="submit"
            id="black-hover"
            style={{ cursor: "pointer" }}
            onClick={changePassword}
            value="Change"
          />
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
