// Constants
import {
  START_GAME,
  RESET_HITS_AND_MISSES,
  HIT_ELEMENT,
  MISS_ELEMENT,
  CREATE_ELEMENT,
  CHANGE_NUMBER_OF_ELEMENTS_TO_CREATE,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  started: false,
  hits: 0,
  misses: 0,
  elements: [],
  numberOfElementsToCreate: 1
};

export const game = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        started: true
      };
    case RESET_HITS_AND_MISSES:
      return {
        ...state,
        hits: 0,
        misses: 0
      };
    case HIT_ELEMENT:
      const a = action.payload.key;
      return {
        ...state,
        hits: state.hits + 1,
        elements: state.elements.filter(element => element !== a)
      };
    case MISS_ELEMENT:
      const b = action.payload.key;
      return {
        ...state,
        misses: state.misses + 1,
        elements: state.elements.filter(element => element !== b)
      };
    case CREATE_ELEMENT:
      const element = action.payload.id;
      return {
        ...state,
        elements: state.elements.concat([element])
      };
    case CHANGE_NUMBER_OF_ELEMENTS_TO_CREATE:
      if (action.payload.rollback) {
        return {
          ...state,
          numberOfElementsToCreate: state.numberOfElementsToCreate - 1
        };
      }
      return {
        ...state,
        numberOfElementsToCreate: state.numberOfElementsToCreate + 1
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default game;
