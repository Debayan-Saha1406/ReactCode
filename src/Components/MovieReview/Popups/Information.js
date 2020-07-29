/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Information = (props) => {
  return (
    <div
      className={`show-overlay ${props.popupClassName}`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75 !important" }}
    >
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
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
              <button onClick={props.closePopup}>{props.btnText}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Information;
