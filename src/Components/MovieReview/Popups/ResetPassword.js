/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import { validateInputField } from "../../../Shared/Services/ValidationService";
import { validateUserEmail } from "../../../Shared/Services/ValidationService";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";
import { showErrorMessage } from "../../../Provider/ToastProvider";

const initialState = {
  value: "",
  isErrorExist: true,
  errorClassName: "",
};
const ResetPassword = (props) => {
  const [email, setEmail] = useState(initialState);
  const [recoveryCode, setRecoveryCode] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState(initialState);
  const dispatch = useDispatch();

  const handleReset = (e) => {
    e.preventDefault();
    if (email.value === "") {
      setInputFieldError(email, setEmail);
    }
    if (recoveryCode.value === "") {
      setInputFieldError(recoveryCode, setRecoveryCode);
    }
    if (password.value === "") {
      setInputFieldError(password, setPassword);
    }
    if (confirmPassword.value === "") {
      setInputFieldError(confirmPassword, setConfirmPassword);
    }

    if (password.value !== confirmPassword.value) {
      setInputFieldError(confirmPassword, setConfirmPassword);
    }

    sendResetPasswordRequest(
      email,
      password,
      recoveryCode,
      confirmPassword,
      dispatch,
      props,
      clearValues
    );
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  const handleClose = (e) => {
    e.preventDefault();
    clearValues();
    props.handleClose();
  };

  const clearValues = () => {
    setEmail(initialState);
    setPassword(initialState);
    setRecoveryCode(initialState);
    setConfirmPassword(initialState);
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

  const handleInputChange = (e, setData) => {
    let isErrorExist = validateInputField(e.target.value);
    if (e.target.name === "email") {
      isErrorExist = validateUserEmail(e.target.value);
    }
    setUiState(e, isErrorExist, setData);
  };

  return (
    <div className={`show-overlay ${props.loginPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3 style={{ fontSize: "25px" }}>Reset Password</h3>
          <form>
            <div className="row">
              <label htmlFor="username">
                Email:
                <div>
                  <input
                    type="text"
                    name="email"
                    id="username"
                    onChange={(e) => handleInputChange(e, setEmail)}
                    style={{ width: "100%", marginLeft: "0px" }}
                    className={email.errorClassName}
                    value={email.value}
                  />
                  {email.errorClassName === "input-error" && (
                    <i
                      class="fa fa-exclamation-circle"
                      id="warning-exclamation"
                    ></i>
                  )}
                </div>
              </label>
            </div>
            <div className="row">
              <label htmlFor="username">
                Recovery Code:
                <div>
                  <input
                    type="text"
                    name="recoveryCode"
                    id="username"
                    onChange={(e) => handleInputChange(e, setRecoveryCode)}
                    style={{ width: "100%", marginLeft: "0px" }}
                    className={recoveryCode.errorClassName}
                    value={recoveryCode.value}
                  />
                  {recoveryCode.errorClassName === "input-error" && (
                    <i
                      class="fa fa-exclamation-circle"
                      id="warning-exclamation"
                    ></i>
                  )}
                </div>
              </label>
            </div>
            <div className="row">
              <label htmlFor="username">
                New Password:
                <div>
                  <input
                    type="password"
                    name="password"
                    id="username"
                    onChange={(e) => handleInputChange(e, setPassword)}
                    style={{ width: "100%", marginLeft: "0px" }}
                    className={password.errorClassName}
                    value={password.value}
                  />
                  {password.errorClassName === "input-error" && (
                    <i
                      class="fa fa-exclamation-circle"
                      id="warning-exclamation"
                    ></i>
                  )}
                </div>
              </label>
            </div>
            <div className="row">
              <label htmlFor="username">
                Confirm Password:
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="username"
                    onChange={(e) => handleInputChange(e, setConfirmPassword)}
                    style={{ width: "100%", marginLeft: "0px" }}
                    className={confirmPassword.errorClassName}
                    value={confirmPassword.value}
                  />
                  {confirmPassword.errorClassName === "input-error" && (
                    <i
                      class="fa fa-exclamation-circle"
                      id="warning-exclamation"
                    ></i>
                  )}
                </div>
              </label>
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  style={{ backgroundColor: "#ffaa3c" }}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button type="submit" onClick={(e) => handleReset(e)}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

function sendResetPasswordRequest(
  email,
  password,
  recoveryCode,
  confirmPassword,
  dispatch,
  props,
  clearValues
) {
  if (
    !email.isErrorExist &&
    !password.isErrorExist &&
    !recoveryCode.isErrorExist &&
    !confirmPassword.isErrorExist &&
    password.value === confirmPassword.value
  ) {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      email: email.value,
      token: recoveryCode.value,
      newPassword: password.value,
    };
    ServiceProvider.post(apiUrl.resetPassword, body).then((response) => {
      if (response.status === 200) {
        dispatch(toggleLoader(false, 1));
        props.handleClose();
        clearValues();
      } else {
        showErrorMessage(response.data.errors);
        dispatch(toggleLoader(false, 1));
      }
    });
  }
}
