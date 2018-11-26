import { combineReducers } from "redux";

import user from "./user.js";
import adaptation from "./adaptation.js";
import game from "./game.js";
import navigation from "./navigation.js";
import results from "./results.js";

export default combineReducers({
  user,
  adaptation,
  game,
  navigation,
  results
});
