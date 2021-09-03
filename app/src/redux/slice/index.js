import { combineReducers } from "redux";
import thunk from "redux-thunk";

import userReducer from "./user";

const reducers = combineReducers({
    user: userReducer,
    middleware: [thunk],
});

export default reducers;
