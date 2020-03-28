import * as actionTypes from "../Actions/actions";

const initialState = {
    showDropDown: '',
    isDropdownToggle: true
};

export const navBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_NAVBAR_DROPDOWN:
            const copiedState = changeDropdownToggle(state);
            return {
                ...state,
                isDropdownToggle: !copiedState.isDropdownToggle,
                showDropDown: copiedState.showDropDown
            };
        default:
            return state;
    }

};

function changeDropdownToggle(state) {
    const copiedstate = { ...state };
    if (copiedstate.isDropdownToggle) {
        copiedstate.showDropDown = "show";
    } else {
        copiedstate.showDropDown = "";
    }

    return copiedstate;

}
