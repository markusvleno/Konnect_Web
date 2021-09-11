import { combineReducers } from "redux";
import thunk from "redux-thunk";

import userReducer from "./user";
import UI from "./UI";

const reducers = combineReducers({
    user: userReducer,
    UI: UI,
    middleware: [thunk],
});

export default reducers;
