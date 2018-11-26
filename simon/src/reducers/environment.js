// Constants
import {
  WRITE_ELEMENTS_TO_STATE,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  elements: null
};

export const environment = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_ELEMENTS_TO_STATE:
      return {
        ...state,
        elements: action.payload.elements
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default environment;
