import { combineReducers } from "redux";

import userReducer from "./userReducer";
import UIReducer from "./UIReducer";

const reducers = combineReducers({
    UI: UIReducer,
    User: userReducer,
});

export default reducers;
