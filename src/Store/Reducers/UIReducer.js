import * as actionTypes from "../Actions/actions";

const initialState = {
  showLoader: false,
  screenOpacity: 1,
  loginPopupClassName: "",
  registerPopupClassName: "",
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader,
        screenOpacity: action.screenOpacity,
      };
    case actionTypes.TOGGLE_LOGIN_POPUP:
      return {
        ...state,
        loginPopupClassName: action.loginPopupClassName,
      };
    case actionTypes.TOGGLE_REGISTER_POPUP:
      return {
        ...state,
        registerPopupClassName: action.registerPopupClassName,
      };
    default:
      return state;
  }
};
