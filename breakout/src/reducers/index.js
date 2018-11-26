import { combineReducers } from "redux";

import user from "./user.js";
import adaptation from "./adaptation.js";
import results from "./results.js";
import navigation from "./navigation.js";

export default combineReducers({
  user,
  navigation,
  adaptation,
  results
});
