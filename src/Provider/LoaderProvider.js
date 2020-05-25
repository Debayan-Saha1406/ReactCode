import React from "react";

const LoaderProvider = (props) => {
  return (
    <div id="preloader">
      <div id="status">
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoaderProvider;
