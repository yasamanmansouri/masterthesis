// Constants
import {
  SET_USER_ID,
  SET_NEW_SPEED,
  SET_NEW_OPACITY,
  SET_ROLLBACK,
  GO_TO_USER_ID_INPUT,
  SET_DIMENSION,
  ADD_POINTS,
  NEXT_ROUND,
  SET_NEW_POINTS,
  SET_NEW_PATTERNLENGTH,
  SAVE_CLICK
} from "../constants/ActionTypes.js";

// Helper
import {
  getNewSpeed,
  getNewOpacity,
  getNewPoints,
  getNewPatternLength
} from "../utils/lightUp";

const initialState = {
  id: null,
  dimension: "",
  rollback: false,
  speed: 3000,
  opacity: 1,
  points: 0,
  pointsValue: 10,
  patternLength: 5,
  clicks: []
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case ADD_POINTS:
      return {
        ...state,
        points: state.points + action.payload.pointsValue
      };
    case SAVE_CLICK:
      return {
        ...state,
        clicks: state.clicks.concat([action.payload.click])
      };
    case SET_NEW_POINTS:
      const currentPoints = action.payload.currentPoints;
      const pointsRollback = action.payload.rollback;
      const newPointsValue = getNewPoints(currentPoints, pointsRollback);
      return {
        ...state,
        pointsValue: newPointsValue
      };
    case NEXT_ROUND:
      return {
        ...state,
        points: 0,
        clicks: []
      };
    case SET_DIMENSION:
      const dimension = action.payload.dimension;
      if (dimension !== "Speed") {
        if (dimension === "Content") {
          return {
            ...state,
            dimension,
            speed: 1000,
            patternLength: 1
          };
        }
        return {
          ...state,
          dimension,
          speed: 1000
        };
      }
      return {
        ...state,
        dimension: action.payload.dimension
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    case SET_ROLLBACK:
      return {
        ...state,
        rollback: true
      };
    case SET_NEW_SPEED:
      const currentSpeed = action.payload.currentSpeed;
      const speedRollback = action.payload.rollback;
      const newSpeed = getNewSpeed(currentSpeed, speedRollback);
      return {
        ...state,
        speed: newSpeed
      };
    case SET_NEW_PATTERNLENGTH:
      const currentPatternLength = action.payload.currentPatternLength;
      const patternLengthRollback = action.payload.rollback;
      const newPatternLength = getNewPatternLength(
        currentPatternLength,
        patternLengthRollback
      );
      return {
        ...state,
        patternLength: newPatternLength
      };
    case SET_NEW_OPACITY:
      const currentOpacity = action.payload.currentOpacity;
      const opacityRollback = action.payload.rollback;
      const newOpacity = getNewOpacity(currentOpacity, opacityRollback);
      return {
        ...state,
        opacity: newOpacity
      };
    default:
      return { ...state };
  }
};

export default user;
