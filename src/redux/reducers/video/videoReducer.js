import { appConstants } from '../../actions/actionTypes';

const initialState = {
    data: [],
    userVideo: []
};

function fetchOneVideoReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.FETCH_ONE_VIDEO:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state
    }
}

function fetchUserVideoReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.FETCH_USER_VIDEO:
            return {
                ...state,
                userVideo: action.payload,
            };
        default:
            return state
    }
}

export {fetchOneVideoReducer, fetchUserVideoReducer};