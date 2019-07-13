import {GET_GROUPS, DELETE_GROUP, ADD_GROUP, EDIT_GROUP} from "../actions/types.js";

const initialState = {
    groups: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload)
            };
        case ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case EDIT_GROUP:
            return {
                ...state,
                groups: [...state.groups.filter(group => group.id !== action.payload.id), action.payload]
            };
        default:
            return state;
    }
}