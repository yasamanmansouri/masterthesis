// Constants
import {
  PRE_TRAINING,
  START_TRAINING,
  START_COUNTDOWN,
  START_USER_INPUT,
  SHOW_RESULTS,
  NEXT_ROUND,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  preTraining: false,
  training: false,
  countdown: false,
  userInput: false,
  results: false,
  round: 0
};

export const navigation = (state = initialState, action = {}) => {
  switch (action.type) {
    case PRE_TRAINING:
      return {
        ...state,
        preTraining: true
      };
    case START_TRAINING:
      return {
        ...state,
        preTraining: false,
        training: true
      };
    case START_COUNTDOWN:
      return {
        ...state,
        training: false,
        countdown: true
      };
    case START_USER_INPUT:
      return {
        ...state,
        countdown: false,
        userInput: true
      };
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1,
        userInput: false,
        preTraining: true
      };
    case SHOW_RESULTS:
      return {
        ...state,
        userInput: false,
        results: true
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default navigation;
