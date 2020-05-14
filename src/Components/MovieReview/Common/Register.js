/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import "../../../css/movie-single.css";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import {
  validateInputField,
  validateUserEmail,
} from "../../../Shared/Services/ValidationService";

const initialState = {
  value: "",
  isErrorExist: false,
  errorClassName: "",
  errorMessage: "",
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
    validateInputField(email, setEmail);
    validateInputField(firstName, setFirstName);
    validateInputField(password, setPassword);
    validateInputField(confirmPassword, setConfirmPassword);
    validateUserEmail(email, setEmail);
    validatePasswordMatch(password, confirmPassword);

    if (
      !email.isErrorExist &&
      !password.isErrorExist &&
      !firstName.isErrorExist &&
      !confirmPassword.isErrorExist &&
      email.value !== "" &&
      password.value !== "" &&
      firstName.value !== "" &&
      confirmPassword.value !== ""
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
          dispatch(toggleLoader(false, 1));
          clearValues();
          props.closeRegisterPopup();
        }
      });
    }
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
                    style={{ width: "100%", marginLeft: "0px" }}
                  />
                  {email.isErrorExist && (
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
                    onChange={(e) =>
                      setFirstName({
                        ...firstName,
                        value: e.target.value,
                        errorClassName: "",
                        errorMessage: "",
                      })
                    }
                    className={firstName.errorClassName}
                    value={firstName.value}
                    style={{ width: "100%", marginLeft: "0px" }}
                  />
                  {firstName.isErrorExist && (
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
                    style={{ width: "100%", marginLeft: "0px" }}
                  />
                  {password.isErrorExist && (
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
                    name="password"
                    placeholder=""
                    onChange={(e) =>
                      setConfirmPassword({
                        ...confirmPassword,
                        value: e.target.value,
                        errorClassName: "",
                        errorMessage: "",
                      })
                    }
                    value={confirmPassword.value}
                    className={confirmPassword.errorClassName}
                    style={{ width: "100%", marginLeft: "0px" }}
                  />
                  {confirmPassword.isErrorExist && (
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
