import React from "react";
import { ImagePicker } from "react-file-picker";

export const ImagePickerProvider = props => {
  return (
    <ImagePicker
      extensions={["jpg", "jpeg", "png"]}
      dims={{
        minWidth: 100,
        maxWidth: 5500,
        minHeight: 100,
        maxHeight: 5500
      }}
      onChange={image => props.handleFileChange(image)}
      onError={errMsg => props.handleIncorrectFileFormat(errMsg)}
    >
      {props.fileComponent}
    </ImagePicker>
  );
};
