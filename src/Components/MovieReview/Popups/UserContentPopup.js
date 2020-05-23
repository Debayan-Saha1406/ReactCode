/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const UserContentPopup = (props) => {
  return (
    <div className={`overlay ${props.loginPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            onClick={(e) => props.handleSecondaryButtonClick(e)}
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
              <div className="col-6">
                <button
                  style={{ backgroundColor: "#ffaa3c" }}
                  onClick={(e) => props.handleSecondaryButtonClick(e)}
                >
                  {props.secondaryButtonText}
                </button>
              </div>
              <div className="col-6">
                <button
                  type="submit"
                  onClick={(e) => props.handlePrimaryButtonClick(e)}
                >
                  {props.primaryButtonText}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserContentPopup;
