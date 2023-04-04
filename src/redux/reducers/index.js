import { combineReducers } from "redux";
import { authReducer, Fetchdata, submitform } from "./allReducers";

const reducers = combineReducers({
  auth: authReducer,
  fetchdata: Fetchdata,
  submitdata: submitform,
});

export default reducers;
