import { createStore } from "redux";
import reducers from "./reducerss";

const store = createStore(reducers);

export default store;
