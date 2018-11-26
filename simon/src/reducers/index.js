//  

import { combineReducers } from "redux";

import input from "./input.js";
import user from "./user.js";
import environment from "./environment.js";
import navigation from "./navigation.js";
import currentRound from "./currentRound.js";
import results from "./results.js";

export default combineReducers({
  input,
  user,
  environment,
  navigation,
  currentRound,
  results
});
