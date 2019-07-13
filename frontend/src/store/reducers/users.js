import {GET_USERS, DELETE_USER, ADD_USER, EDIT_USER} from "../actions/types.js";

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case EDIT_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.payload.id), action.payload]
            };
        default:
            return state;
    }
}