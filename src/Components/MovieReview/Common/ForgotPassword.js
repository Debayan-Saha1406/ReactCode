/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { validateInputField } from "../../../Shared/Services/ValidationService";
import { useDispatch } from "react-redux";
import {
  toggleLoader,
  togglePopup,
} from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { validateUserEmail } from "./../../../Shared/Services/ValidationService";
import { useEffect } from "react";
import { popupType } from "./../../../Shared/Constants";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState({
    value: "",
    isErrorExist: true,
    errorClassName: "",
  });
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    props.handleClose();
  };
  const handleSendMail = (e) => {
    e.preventDefault();

    if (email.value.trim() === "") {
      setEmail({
        ...email,
        isErrorExist: true,
        errorClassName: "input-error",
      });
    }

    if (!email.isErrorExist) {
      const body = {
        email: email.value,
      };
      dispatch(toggleLoader(true, "15%"));
      ServiceProvider.post(apiUrl.forgotPassword, body).then((response) => {
        if (response.status === 404) {
          dispatch(toggleLoader(false, 1));
          showErrorMessage(response.data.errors);
        }
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          clearValues();
          dispatch(togglePopup("openform", popupType.resetPassword));
        }
      });
    }
  };

  const clearValues = () => {
    setEmail({ value: "", isErrorExist: false, errorClassName: "" });
  };

  const setUiState = (value, isErrorExist) => {
    if (isErrorExist) {
      setEmail({
        ...email,
        isErrorExist: true,
        value: value,
        errorClassName: "input-error",
      });
    } else {
      setEmail({
        ...email,
        isErrorExist: false,
        value: value,
        errorClassName: "",
      });
    }
  };

  const handleInputChange = (e, setData) => {
    let isErrorExist = validateInputField(e.target.value);
    isErrorExist = validateUserEmail(e.target.value);
    setUiState(e.target.value, isErrorExist);
  };

  return (
    <div className={`overlay ${props.loginPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3 style={{ fontSize: "25px" }}>Forgot Password</h3>
          <form method="post">
            <div className="row">
              <label
                htmlFor="username"
                style={{ textAlign: "center", textTransform: "none" }}
              >
                To recover your password, you need to enter your registered
                email address. We will send the recovery code to your email.
              </label>
            </div>

            <div className="row">
              <label htmlFor="username">
                Email:
                <div>
                  <input
                    type="text"
                    name="username"
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
              <div className="col-6">
                <button
                  style={{ backgroundColor: "#ffaa3c" }}
                  onClick={(e) => handleClose(e)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button type="submit" onClick={(e) => handleSendMail(e)}>
                  Send Mail
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
