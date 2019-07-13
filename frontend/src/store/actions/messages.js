import {CREATE_MESSAGE, GET_ERRORS, CLEAR_ERRORS, LOADING, LOADED} from "./types";

// CREATE MESSAGE
export const createMessage = (msg, success=false) => {
    return {
        type: CREATE_MESSAGE,
        msg,
        success
    };
};

// LOADING
export const loading = () => {
    return {
        type: LOADING
    }
};

// LOADED
export const loaded = () => {
    return {
        type: LOADED
    }
};

// CLEAR ERRORS
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
        payload: ""
    };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status}
    };
};