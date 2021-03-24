import { appConstants } from '../../actions/actionTypes';

const initialState = {
    data: []
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case appConstants.SIGN_IN_WITH_GOOGLE:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state
    }
}

export default authReducer;