import * as actionTypes from "../Actions/actions";
import ServiceProvider from "../../Provider/ServiceProvider";
import { apiUrl } from './../../Shared/Constants';

export const toggleSideBar = () => {
  return {
    type: actionTypes.TOGGLE_SIDEBAR
  };
};

export const toggleNavBarDropDown = () => {
  return {
    type: actionTypes.TOGGLE_NAVBAR_DROPDOWN
  };
};

export const toggleAsyncSideBar = () => {
  return dispatch => {
    ServiceProvider
      .get(apiUrl.users)
      .then((response) => {
        dispatch(toggleSideBar());
      });
  };
};

export const handleInputChange = (state) => {
  return{
    type: actionTypes.HANDLE_INPUTCHANGE,
    updatedFirstName:state.firstName,
    updatedLastName:state.lastName
  };
};

export const updateUserDetails = () => {
  return{
    type: actionTypes.UPDATE_USER_DETAILS
  };
};

