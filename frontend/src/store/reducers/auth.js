import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    LOADING,
    LOADED, CREATE_MESSAGE
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            let token = action.payload.key;
            localStorage.setItem("token", token);
            return {
                ...state,
                token,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: undefined,
                isAuthenticated: false,
                isLoading: false
            };
        case LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LOADED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}