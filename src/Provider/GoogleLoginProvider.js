import React from "react";
import { GoogleLogin } from "react-google-login";
import "../css/loginProvider.css";

const GoogleLoginProvider = (props) => {
  return (
    <GoogleLogin
      clientId="817675782441-gflgd9rdvuddbb03us5dm65cf38flkql.apps.googleusercontent.com"
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="loginBtn loginBtn--google"
        >
          Login with Google
        </button>
      )}
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginProvider;
