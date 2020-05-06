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
    validateEmail(email, setEmail);
    validatePasswordMatch(password, confirmPassword);

    if (
      !email.isErrorExist &&
      !password.isErrorExist &&
      !firstName.isErrorExist &&
      !password.isErrorExist &&
      !confirmPassword.isErrorExist
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
          showErrorMessage("Email Already Exists");
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

  function validateEmail(email, setEmail) {
    if (
      email.value.trim() !== "" &&
      email.value
        .trim()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
        ) == null
    ) {
      setEmail({
        ...email,
        isErrorExist: true,
        errorClassName: "input-error",
        errorMessage: "Entered Email is Not Correct",
      });
    } else if (email.value.trim() !== "") {
      setEmail({
        ...email,
        isErrorExist: false,
        errorClassName: "",
        errorMessage: "",
      });
    }
  }

  function validateInputField(state, setState) {
    if (state.value === undefined || state.value.trim() === "") {
      setState({
        ...state,
        isErrorExist: true,
        errorClassName: "input-error",
        errorMessage: "Required",
      });
    } else {
      setState({
        ...state,
        isErrorExist: false,
        errorClassName: "",
        errorMessage: "",
      });
    }
  }

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
              <label htmlFor="email-2">
                your email:
                <br></br>
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
                />
                {email.isErrorExist && (
                  <label className="error-message">{email.errorMessage}</label>
                )}
              </label>
            </div>
            <div className="row">
              <label htmlFor="username-2">
                First Name:
                <br></br>
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
                />
                {firstName.isErrorExist && (
                  <label className="error-message">
                    {firstName.errorMessage}
                  </label>
                )}
              </label>
            </div>
            <div className="row">
              <label htmlFor="username-2">
                Last Name:
                <br></br>
                <input
                  id="input"
                  type="text"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName.value}
                />
              </label>
            </div>
            <div className="row">
              <label htmlFor="password-2">
                Password:
                <br></br>
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
                />
                {password.isErrorExist && (
                  <label className="error-message">
                    {password.errorMessage}
                  </label>
                )}
              </label>
            </div>
            <div className="row">
              <label htmlFor="repassword-2">
                re-type Password:
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
                />
                {confirmPassword.isErrorExist && (
                  <label className="error-message">
                    {confirmPassword.errorMessage}
                  </label>
                )}
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
