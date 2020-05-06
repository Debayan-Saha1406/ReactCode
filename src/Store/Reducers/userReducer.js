import { SAVE_USERINFO } from "./../Actions/actions";
const initialState = {
  isUserLoggedIn: false,
  loggedInEmail: "",
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERINFO:
      return {
        ...state,
        isUserLoggedIn: action.isUserLoggedIn,
        loggedInEmail: action.loggedInEmail,
      };
    default:
      return state;
  }
};
