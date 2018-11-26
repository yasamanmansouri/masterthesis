// Constants
import {
  SET_USER_ID,
  GO_TO_USER_ID_INPUT,
  RESET_CLICKS,
  SAVE_CLICK
} from "../constants/ActionTypes.js";

const initialState = {
  id: null,
  clicks: []
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
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
