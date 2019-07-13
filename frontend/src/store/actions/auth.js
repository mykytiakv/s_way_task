import axios from "axios";
import {returnErrors} from "./messages";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    LOADED,
    LOADING
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: LOADING});

    axios
        .post("/api/auth/user/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
        .finally(() => {
            dispatch({type: LOADED})
        })
};

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({username, password});
    dispatch({type: LOADING});

    axios
        .post("/api/auth/login/", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            let {data} = err.response;
            let message = (data.hasOwnProperty("non_field_errors")) ? data["non_field_errors"][0] : data;

            dispatch(returnErrors(message, err.response.status));
            dispatch({type: LOGIN_ERROR});
        })
        .finally(() => {
            dispatch({type: LOADED})
        })
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    dispatch({type: LOADING});

    axios
        .post("/api/auth/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({type: LOGOUT_SUCCESS});
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
        .finally(() => {
            dispatch({type: LOADED})
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["X-CSRFTOKEN"] = token;
    }

    return config;
};