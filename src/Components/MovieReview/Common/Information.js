/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch } from "react-redux";
import { togglePopup } from "../../../Store/Actions/actionCreator";
import { popupType } from "./../../../Shared/Constants";

const Information = (props) => {
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(togglePopup("openform", popupType.resetPassword));
  };
  return (
    <div className={`overlay ${props.loginPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            onClick={props.handleClose}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3 style={{ fontSize: "25px" }}>{props.title}</h3>
          <form method="post">
            <div className="row">
              <label
                htmlFor="username"
                style={{ textAlign: "center", textTransform: "none" }}
              >
                {props.content}
              </label>
            </div>

            <div className="row">
              <button onClick={handleOk}>Ok</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Information;
