import React from "react";

const LoaderProvider = (props) => {
  return (
    <React.Fragment>
      {props.showAdminLoader ? (
        <div>
          <div id="status">
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div id="preloader">
          <div id="status">
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LoaderProvider;
