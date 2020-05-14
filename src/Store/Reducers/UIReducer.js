import * as actionTypes from "../Actions/actions";

const initialState = {
  showLoader: false,
  screenOpacity: 1,
  popupClassName: "",
  popupType: "",
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader,
        screenOpacity: action.screenOpacity,
      };
    case actionTypes.TOGGLE_POPUP:
      return {
        ...state,
        popupClassName: action.popupClassName,
        popupType: action.popupType,
      };
    default:
      return state;
  }
};
