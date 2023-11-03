import { combineReducers } from "redux";
import appReducer from "./AppReducer";

const rootReducer = combineReducers({
    appReducer:appReducer
});
export default rootReducer;