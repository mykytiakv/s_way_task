import axios from "axios";
import {clearErrors, createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {GET_USERS, DELETE_USER, ADD_USER, EDIT_USER, LOADING, LOADED} from "./types";

// GET USERS
export const getUsers = () => (dispatch, getState) => {
    const {users} = getState().users;

    if (users.length === 0) dispatch({type: LOADING});

    axios
        .get("/api/users/", tokenConfig(getState))
        .then(res => {
            dispatch(clearErrors());
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
        .finally(() => {
            if (users.length === 0) dispatch({type: LOADED});
        })
};

// DELETE USER
export const deleteUser = id => (dispatch, getState) => {
    dispatch({type: LOADING});

    axios
        .delete(`/api/users/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The user has been deleted', true));
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        })
        .catch(err => console.log(err))
        .finally(() => dispatch({type: LOADED}));
};

// ADD USER
export const addUser = user => (dispatch, getState) => {
    dispatch({type: LOADING});
    axios
        .post("/api/users/", user, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The user has been created', true));
            dispatch({
                type: ADD_USER,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
        .finally(() => dispatch({type: LOADED}));
};

// EDIT USER
export const editUser = user => (dispatch, getState) => {
    dispatch({type: LOADING});
    axios
        .put(`/api/users/${user.id}`, user, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The user has been edited', true));
            dispatch({
                type: EDIT_USER,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
        .finally(() => dispatch({type: LOADED}));
};