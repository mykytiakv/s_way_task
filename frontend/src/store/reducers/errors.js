import {GET_ERRORS, CLEAR_ERRORS, CREATE_MESSAGE} from "../actions/types";

const initialState = {
    msg: {},
    status: null,
    success: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                success: action.payload.success,
                status: action.payload.status
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                status: null,
                success: false
            };
        case CREATE_MESSAGE:
            return {
                status: action.status,
                msg: action.msg,
                success: action.success
            };
        default:
            return state;
    }
}