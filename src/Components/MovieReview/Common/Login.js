/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {
  validateInputField,
  validateUserEmail,
} from "../../../Shared/Services/ValidationService";
import { useDispatch } from "react-redux";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, constants } from "../../../Shared/Constants";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";

const initialState = {
  value: "",
  isErrorExist: true,
  errorClassName: "",
  errorMessage: "",
};
const Login = (props) => {
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const dispatch = useDispatch();

  const clearValues = () => {
    setEmail(initialState);
    setPassword(initialState);
    props.closeLoginPopup();
  };

  const login = (e) => {
    e.preventDefault();
    validateInputField(email, setEmail);
    validateInputField(password, setPassword);
    validateUserEmail(email, setEmail);

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
          });
          dispatch(saveUserInfo(email.value, true));
        }
      });
    }
  };

  return (
    <div className={`overlay ${props.loginPopupClassName}`}>
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
                <input
                  type="text"
                  name="username"
                  id="username"
                  required="required"
                  onChange={(e) =>
                    setEmail({
                      ...email,
                      value: e.target.value,
                      errorClassName: "",
                      errorMessage: "",
                    })
                  }
                  className={email.errorClassName}
                  value={email.value}
                />
                {email.isErrorExist && (
                  <label className="error-message">{email.errorMessage}</label>
                )}
              </label>
            </div>

            <div className="row">
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  id="password"
                  required="required"
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      value: e.target.value,
                      errorClassName: "",
                      errorMessage: "",
                    })
                  }
                  value={password.value}
                  className={password.errorClassName}
                />
                {password.isErrorExist && (
                  <label className="error-message">
                    {password.errorMessage}
                  </label>
                )}
              </label>
            </div>
            <div className="row">
              <div className="remember">
                <div>
                  <input type="checkbox" name="remember" value="Remember me" />
                  <span>Remember me</span>
                </div>
                <div className="right"></div>
                <a className="forgot" href="#">
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
