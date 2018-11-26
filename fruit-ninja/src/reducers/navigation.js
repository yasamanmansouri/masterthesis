// Constants
import {
  GO_TO_RESULTS,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  results: false
};

export const navigation = (state = initialState, action = {}) => {
  switch (action.type) {
    case GO_TO_RESULTS:
      return {
        ...state,
        results: true
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default navigation;
