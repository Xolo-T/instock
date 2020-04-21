import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import reports from "./reports_reducer";
import ui from "./ui_reducer";

const RootReducer = combineReducers({
  session,
  errors,
  reports,
  ui
});

export default RootReducer;
