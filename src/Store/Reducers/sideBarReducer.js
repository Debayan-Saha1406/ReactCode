import * as actionTypes from "../Actions/actions";

const initialState = {
    isSideBarOpen: true,
    sideBarClassName: "toggled"
  };

export const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDEBAR:
      const copiedState = changeSideBarClassName(state);
      return {
        ...state,
        isSideBarOpen: !copiedState.isSideBarOpen,
        sideBarClassName: copiedState.sideBarClassName
      };
    default:
      return state;
  }
};

function changeSideBarClassName(state) {
    const copiedState = { ...state };
    if (copiedState.isSideBarOpen) {
        copiedState.sideBarClassName = "";
    }
    else {
        copiedState.sideBarClassName = "toggled";
    }
    return copiedState;
}

