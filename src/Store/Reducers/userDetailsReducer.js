import {  UPDATE_USER_DETAILS, HANDLE_INPUTCHANGE } from "../Actions/actions";

const initialState = {
    firstName : "Heena",
    lastName : "Verma",
    updatedFirstName:"",
    updatedLastName:""
};

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_INPUTCHANGE:
            return {
                ...state,
                updatedFirstName : action.updatedFirstName,
                updatedLastName : action.updatedLastName
            };
            case UPDATE_USER_DETAILS:
            return {
                ...state,
                firstName : state.updatedFirstName ? state.updatedFirstName : state.firstName,
                lastName : state.updatedLastName ?  state.updatedLastName : state.lastName,
                updatedFirstName :"",
                updatedLastName :""
            };
        default:
            return state;
    }

};
