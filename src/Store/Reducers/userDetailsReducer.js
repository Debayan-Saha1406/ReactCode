export const UPDATE_USERDETAILS = 'UPDATE_USERDETAILS';

const initialState = {
    firstName : "",
    lastName : ""
};

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERDETAILS:
            return {
                ...state
            };
        default:
            return state;
    }

};
