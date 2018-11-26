// Constants
import {
  SELECT_ELEMENT,
  NEXT_ROUND,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  selected: []
};

export const selected = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_ELEMENT:
      return {
        ...state,
        selected: [...state.selected, action.payload.key]
      };
    case GO_TO_USER_ID_INPUT:
    case NEXT_ROUND:
      return initialState;
    default:
      return { ...state };
  }
};

export default selected;
