/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import {
  validateInputField,
  validateUserEmail,
} from "../../../Shared/Services/ValidationService";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, constants } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { togglePopup } from "../../../Store/Actions/actionCreator";
import { popupType } from "./../../../Shared/Constants";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";

const initialState = {
  value: "",
  isErrorExist: true,
  errorClassName: "",
};
const Login = (props) => {
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const clearValues = () => {
    setEmail(initialState);
    setPassword(initialState);
    props.closeLoginPopup();
  };

  const login = (e) => {
    e.preventDefault();

    if (email.value === "") {
      setInputFieldError(email, setEmail);
    }

    if (password.value === "") {
      setInputFieldError(password, setPassword);
    }

    sendLoginRequest(email, password, dispatch, clearValues, props, rememberMe);
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  const handleForgotPassword = () => {
    dispatch(togglePopup("openform", popupType.forgotPassword));
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

  useEffect(() => {
    const loginDetails = getLocalStorageItem(constants.loginDetails);
    if (loginDetails) {
      setEmail({
        ...email,
        value: loginDetails.email,
        errorClassName: "",
        isErrorExist: false,
      });
      setPassword({
        ...password,
        value: loginDetails.password,
        errorClassName: "",
        isErrorExist: false,
      });
      setRememberMe(loginDetails.rememberMe);
    }
  }, []);

  return (
    <div
      className={`show-overlay ${props.loginPopupClassName}`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75 !important" }}
    >
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            onClick={() => clearValues()}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3>Login</h3>
          <form method="post">
            <div className="row">
              <label htmlFor="username">
                Email:
                <div>
                  <input
                    type="text"
                    name="email"
                    id="username"
                    required="required"
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
              <label htmlFor="password">
                Password:
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required="required"
                    onChange={(e) => handleInputChange(e, setPassword)}
                    style={{ width: "100%", marginLeft: "0px" }}
                    value={password.value}
                    className={password.errorClassName}
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
            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-6">
                <input
                  type="checkbox"
                  name="remember"
                  value="Remember me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  style={{ marginTop: "2px" }}
                />
                <span>Remember me</span>
              </div>
              <div className="col-6">
                <a className="forgot" onClick={handleForgotPassword}>
                  Forget password ?
                </a>
              </div>
            </div>
            <div className="row">
              <button type="submit" onClick={login}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
function sendLoginRequest(
  email,
  password,
  dispatch,
  clearValues,
  props,
  rememberMe
) {
  if (!email.isErrorExist && !password.isErrorExist) {
    const body = {
      email: email.value,
      password: password.value,
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
        props.closeLoginPopup();
        setLocalStorageItem(constants.userDetails, response.data.data);
        setLocalStorageItem(constants.loginDetails, {
          email: email.value,
          password: password.value,
          rememberMe: rememberMe,
        });
        dispatch(saveUserInfo(email.value, true));
      }
    });
  }
}
