import {
  UPDATE_USER_DETAILS,
  HANDLE_INPUTCHANGE,
  UPDATE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE,
} from "../Actions/actions";
import image from "../../images/avatar.jpg";
import { SAVE_USER_DATA } from "./../Actions/actions";
import { getLocalStorageItem } from "./../../Provider/LocalStorageProvider";
import { constants } from "../../Shared/Constants";

const getUserDetails = () => {
  return getLocalStorageItem(constants.userDetails);
};

const initialState = {
  userId: getUserDetails() ? getUserDetails().userId : 0,
  firstName: getUserDetails() ? getUserDetails().firstName : "",
  lastName: getUserDetails() ? getUserDetails().lastName : "",
  email: getUserDetails() ? getUserDetails().email : "",
  updatedFirstName: "",
  updatedLastName: "",
  profileImage: getUserDetails()
    ? getUserDetails().profileImageUrl !== null
      ? getUserDetails().profileImageUrl
      : image
    : image,
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_INPUTCHANGE:
      return {
        ...state,
        updatedFirstName: action.updatedFirstName,
        updatedLastName: action.updatedLastName,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        firstName: state.updatedFirstName
          ? state.updatedFirstName
          : state.firstName,
        lastName: state.updatedLastName
          ? state.updatedLastName
          : state.lastName,
        updatedFirstName: "",
        updatedLastName: "",
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        userId: action.userData.userId,
        firstName: action.userData.firstName,
        lastName: action.userData.lastName,
        email: action.userData.email,
        profileImage: action.userData.profileImageUrl,
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.profileImage,
      };
    case DELETE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.profileImage,
      };

    default:
      return state;
  }
};
