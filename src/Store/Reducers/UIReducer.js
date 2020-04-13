import * as actionTypes from "../Actions/actions";

const initialState = {
  showLoader: false,
  screenOpacity: 1,
};

export const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return {
        ...state,
        showLoader: action.showLoader,
        screenOpacity: action.screenOpacity,
      };
    default:
      return state;
  }
};
