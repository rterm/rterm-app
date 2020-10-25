import {combineReducers} from "redux";
import auth from "./auth";
import actions from "./actions";
export default combineReducers({
  auth,
  actions,
});
