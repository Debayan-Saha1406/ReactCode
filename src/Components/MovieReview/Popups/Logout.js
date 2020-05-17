/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  clearLocalStorage,
  removeLocalStorageItem,
} from "../../../Provider/LocalStorageProvider";

import {
  saveUserInfo,
  togglePopup,
} from "../../../Store/Actions/actionCreator";
import { getLocalStorageItem } from "../../../Provider/LocalStorageProvider";
import { constants } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { popupType } from "./../../../Shared/Constants";

const Logout = (props) => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    const loginDetails = getLocalStorageItem(constants.loginDetails);
    if (loginDetails) {
      if (loginDetails.rememberMe) {
        removeLocalStorageItem(constants.userDetails);
      } else {
        clearLocalStorage();
      }
    }
    debugger;
    dispatch(saveUserInfo("", false));
    props.handleClose(e);
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(togglePopup("", popupType.logout));
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
          <h3 style={{ fontSize: "25px" }}>Logout</h3>
          <form method="post">
            <div className="row">
              <label
                htmlFor="username"
                style={{ textAlign: "center", textTransform: "none" }}
              >
                You are about to logout your account. You will need to login
                again to start reviewing movies and give ratings
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
                <button type="submit" onClick={(e) => handleLogout(e)}>
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logout;
