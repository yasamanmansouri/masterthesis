// Constants
import {
  SET_USER_ID,
  GO_TO_USER_ID_INPUT,
  SET_ROLLBACK,
  SAVE_CLICK,
  RESET_CLICKS
} from "../constants/ActionTypes.js";

const initialState = {
  id: null,
  rollback: false,
  clicks: []
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case SET_ROLLBACK:
      return {
        ...state,
        rollback: true
      };
    case SAVE_CLICK:
      return {
        ...state,
        clicks: state.clicks.concat(action.payload.click)
      };
    case RESET_CLICKS:
      return {
        ...state,
        clicks: []
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default user;
