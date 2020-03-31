import { UPDATE_USERDETAILS } from "../Actions/actions";

const initialState = {
    firstName : "Heena",
    lastName : "Verma"
};

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERDETAILS:
            return {
                ...state,
                [action.name]:action.value
            };
        default:
            return state;
    }

};
