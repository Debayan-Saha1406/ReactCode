/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import "../../../css/movie-single.css";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, constants } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import {
  toggleLoader,
  saveUserInfo,
} from "../../../Store/Actions/actionCreator";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { setLocalStorageItem } from "../../../Provider/LocalStorageProvider";
import {
  validateInputField,
  validateUserEmail,
} from "../../../Shared/Services/ValidationService";

const initialState = {
  value: "",
  isErrorExist: true,
  errorClassName: "",
};
const Register = (props) => {
  const [email, setEmail] = useState(initialState);
  const [firstName, setFirstName] = useState(initialState);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState(initialState);
  const dispatch = useDispatch();

  const signUp = (e) => {
    e.preventDefault();
    if (firstName.value === "") {
      setInputFieldError(email, setFirstName);
    }
    if (email.value === "") {
      setInputFieldError(email, setEmail);
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

    if (
      !email.isErrorExist &&
      !password.isErrorExist &&
      !firstName.isErrorExist &&
      !confirmPassword.isErrorExist &&
      password.value === confirmPassword.value
    ) {
      const body = {
        firstName: firstName.value,
        lastName: lastName,
        email: email.value,
        password: password.value,
      };
      dispatch(toggleLoader(true, "15%"));
      ServiceProvider.post(apiUrl.register, body).then((response) => {
        if (response.status === 400) {
          dispatch(toggleLoader(false, 1));
          showErrorMessage(response.data.errors);
        }
        if (response.status === 200) {
          sendLoginRequest(email.value, password.value);
          clearValues();
        }
      });
    }
  };

  const sendLoginRequest = (email, password) => {
    const body = {
      email: email,
      password: password,
    };
    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.post(apiUrl.userLogin, body).then((response) => {
      if (response.status === 404) {
        dispatch(toggleLoader(false, 1));
        showErrorMessage(response.data.errors);
      }
      if (response.status === 200) {
        dispatch(toggleLoader(false, 1));
        clearValues();
        props.closeRegisterPopup();
        setLocalStorageItem(constants.userDetails, response.data.data);
        setLocalStorageItem(constants.loginDetails, {
          email: email,
          password: password,
          rememberMe: false,
        });
        dispatch(saveUserInfo(email, true));
      }
    });
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  const clearValues = () => {
    setEmail(initialState);
    setFirstName(initialState);
    setLastName("");
    setPassword(initialState);
    setConfirmPassword(initialState);
    props.closeRegisterPopup();
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        isErrorExist: true,
        errorClassName: "input-error",
        errorMessage: "Passwords Do Not Match",
      });
    } else if (confirmPassword.value.trim() !== "") {
      setConfirmPassword({
        ...confirmPassword,
        isErrorExist: false,
        errorClassName: "",
        errorMessage: "",
      });
    }
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
    <div className={`overlay ${props.registerPopupClassName}`}>
      <div className="login-wrapper" id="signup-content">
        <div className="login-content">
          <a
            className="close"
            onClick={() => clearValues()}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3>sign up</h3>
          <form method="post">
            <div className="row">
              <label htmlFor="email-2" style={{ marginBottom: "15px" }}>
                your email:
                <div>
                  <input
                    id="input"
                    type="text"
                    name="email"
                    placeholder=""
                    onChange={(e) => handleInputChange(e, setEmail)}
                    className={email.errorClassName}
                    value={email.value}
                    style={{ width: "100%", marginLeft: "0px" }}
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
              <label htmlFor="username-2" style={{ marginBottom: "15px" }}>
                First Name:
                <div>
                  <input
                    id="input"
                    type="text"
                    name="firstName"
                    onChange={(e) => handleInputChange(e, setFirstName)}
                    className={firstName.errorClassName}
                    value={firstName.value}
                    style={{ width: "100%", marginLeft: "0px" }}
                  />
                  {firstName.errorClassName === "input-error" && (
                    <i
                      class="fa fa-exclamation-circle"
                      id="warning-exclamation"
                    ></i>
                  )}
                </div>
              </label>
            </div>
            <div className="row">
              <label htmlFor="username-2" style={{ marginBottom: "15px" }}>
                Last Name:
                <input
                  id="input"
                  type="text"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  style={{ width: "100%", marginLeft: "0px" }}
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="password-2" style={{ marginBottom: "15px" }}>
                Password:
                <div>
                  <input
                    id="input"
                    type="password"
                    name="password"
                    placeholder=""
                    onChange={(e) => handleInputChange(e, setPassword)}
                    value={password.value}
                    className={password.errorClassName}
                    style={{ width: "100%", marginLeft: "0px" }}
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
              <label htmlFor="repassword-2" style={{ marginBottom: "15px" }}>
                re-type Password:
                <div>
                  <input
                    id="input"
                    type="password"
                    name="confirmPassword"
                    placeholder=""
                    onChange={(e) => handleInputChange(e, setConfirmPassword)}
                    value={confirmPassword.value}
                    className={confirmPassword.errorClassName}
                    style={{ width: "100%", marginLeft: "0px" }}
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
              <button type="submit" onClick={signUp}>
                sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
