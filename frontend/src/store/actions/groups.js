import axios from "axios";
import {clearErrors, createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {DELETE_GROUP, ADD_GROUP, EDIT_GROUP, GET_GROUPS, LOADING, LOADED} from "./types";

// GET GROUPS
export const getGroups = () => (dispatch, getState) => {
    const {groups} = getState().groups;

    if (groups.length === 0) dispatch({type: LOADING});

    axios
        .get("/api/groups/", tokenConfig(getState))
        .then(res => {
            dispatch(clearErrors());
            dispatch({
                type: GET_GROUPS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
        .finally(() => {
            if (groups.length === 0) dispatch({type: LOADED});
        })
};

// DELETE GROUP
export const deleteGroup = id => (dispatch, getState) => {
    dispatch({type: LOADING});

    axios
        .delete(`/api/groups/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The group has been deleted', true));
            dispatch({
                type: DELETE_GROUP,
                payload: id
            });
        })
        .catch(err => console.log(err))
        .finally(() => dispatch({type: LOADED}));
};

// ADD GROUP
export const addGroup = group => (dispatch, getState) => {
    dispatch({type: LOADING});

    axios
        .post("/api/groups/", group, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The group has been created', true));
            dispatch({
                type: ADD_GROUP,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
        .finally(() => dispatch({type: LOADED}));
};

// EDIT GROUP
export const editGroup = group => (dispatch, getState) => {
    dispatch({type: LOADING});

    axios
        .put(`/api/groups/${group.id}`, group, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('The group has been edited', true));
            dispatch({
                type: EDIT_GROUP,
                payload: res.data
            });
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
        .finally(() => dispatch({type: LOADED}));
};