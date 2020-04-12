import * as actionTypes from "../Actions/actions";
import ServiceProvider from "../../Provider/ServiceProvider";
import { apiUrl } from "./../../Shared/Constants";

export const toggleSideBar = () => {
  return {
    type: actionTypes.TOGGLE_SIDEBAR,
  };
};

export const toggleNavBarDropDown = () => {
  return {
    type: actionTypes.TOGGLE_NAVBAR_DROPDOWN,
  };
};

export const toggleAsyncSideBar = () => {
  return (dispatch) => {
    ServiceProvider.get(apiUrl.users).then((response) => {
      dispatch(toggleSideBar());
    });
  };
};

export const handleInputChange = (state) => {
  return {
    type: actionTypes.HANDLE_INPUTCHANGE,
    updatedFirstName: state.firstName,
    updatedLastName: state.lastName,
  };
};

export const updateUserDetails = () => {
  return {
    type: actionTypes.UPDATE_USER_DETAILS,
  };
};

export const handleProfileImage = (image, userId) => {
  let updatedImage = handleFileData(image);
  return (dispatch) => {
    const body = {
      image: updatedImage,
    };
    ServiceProvider.put(apiUrl.profileImage, userId, body).then((response) => {
      dispatch(updateProfileImage(image));
    });
  };
};

export const updateProfileImage = (image) => {
  return {
    type: actionTypes.UPDATE_PROFILE_IMAGE,
    profileImage: image,
  };
};

export const deleteProfileImage = (userId, defaultImage) => {
  return (dispatch) => {
    ServiceProvider.deleteItem(apiUrl.profileImage, userId).then((response) => {
      dispatch(deleteProfileImageFromStore(defaultImage));
    });
  };
};

export const deleteProfileImageFromStore = (defaultImage) => {
  return {
    type: actionTypes.DELETE_PROFILE_IMAGE,
    profileImage: defaultImage,
  };
};

export const saveUserData = (userData) => {
  debugger;
  return {
    type: actionTypes.SAVE_USER_DATA,
    userData: userData,
  };
};

function handleFileData(image) {
  let updatedImage;
  if (image[image.indexOf("/") + 1] === "j")
    updatedImage = image.replace("data:image/jpeg;base64,", "");
  else {
    updatedImage = image.replace("data:image/png;base64,", "");
  }
  return updatedImage;
}
