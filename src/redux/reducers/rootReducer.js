import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './auth/authReducer';
import {fetchOneVideoReducer, fetchUserVideoReducer} from './video/videoReducer';


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: authReducer,
    fetchOneVideoReducer,
    fetchUserVideoReducer
});

export default persistReducer(persistConfig, rootReducer);
