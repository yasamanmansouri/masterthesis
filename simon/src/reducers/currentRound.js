// Constants
import {
  WRITE_PATTERN_TO_STATE,
  NEXT_ROUND,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  pattern: [],
  patternSize: null
};

export const currentRound = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_PATTERN_TO_STATE:
      return {
        ...state,
        patternSize: action.payload.pattern.length,
        pattern: action.payload.pattern
      };
    case NEXT_ROUND:
      return initialState;
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default currentRound;
