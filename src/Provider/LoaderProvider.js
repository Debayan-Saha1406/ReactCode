import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderProvider = (props) => {
  return (
    <Loader
      type="Oval"
      color="black"
      height={50}
      width={50}
      visible={props.showLoader}
    />
  );
};

export default LoaderProvider;
