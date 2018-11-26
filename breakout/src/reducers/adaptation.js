import {
  SET_NEW_SPEED,
  SET_DIMENSION,
  GO_TO_USER_ID_INPUT,
  SAVE_ROUND
} from "../constants/ActionTypes.js";

const initialState = {
  dimension: "",
  round: 1,
  speed: null
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_SPEED:
      if (action.payload.rollback) {
        return {
          ...state,
          speed: state.speed - 0.5
        };
      }
      return {
        ...state,
        speed: state.speed + 1
      };
    case SAVE_ROUND:
      return {
        ...state,
        round: state.round + 1
      };
    case SET_DIMENSION:
      const speed = action.payload.dimension === "Speed" ? 3 : 6;
      return {
        ...state,
        dimension: action.payload.dimension,
        speed
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
