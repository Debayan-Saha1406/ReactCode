import {
  UPDATE_USER_DETAILS,
  HANDLE_INPUTCHANGE,
  UPDATE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE
} from "../Actions/actions";
import image from "../../images/logo.jpg";
import avatar from "../../images/avatar.jpg";

const initialState = {
  firstName: "Heena",
  lastName: "Verma",
  updatedFirstName: "",
  updatedLastName: "",
  profileImage: image
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_INPUTCHANGE:
      return {
        ...state,
        updatedFirstName: action.updatedFirstName,
        updatedLastName: action.updatedLastName
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
        updatedLastName: ""
      };
    case UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.profileImage
      };
    case DELETE_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: avatar
      };

    default:
      return state;
  }
};
