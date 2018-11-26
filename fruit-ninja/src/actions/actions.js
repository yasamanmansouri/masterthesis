import {
  SET_USER_ID,
  SET_DIMENSION,
  SAVE_ROUND,
  GO_TO_RESULTS,
  STORE_IN_DB,
  STORE_IN_DB_SUCCESS,
  STORE_IN_DB_ERROR,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND,
  SET_ROLLBACK,
  CHANGE_ACTIVE_ROWS,
  CHANGE_NUMBER_OF_ACTIVE_ROWS,
  START_GAME,
  SAVE_CLICK,
  CHANGE_INCENTIVES,
  RESET_CLICKS,
  RESET_HITS_AND_MISSES,
  HIT_ELEMENT,
  MISS_ELEMENT,
  TOGGLE_INCENTIVES,
  CREATE_ELEMENT,
  CHANGE_NUMBER_OF_ELEMENTS_TO_CREATE
} from "../constants/ActionTypes.js";

import { firebaseApp } from "../firebase.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
export const selectDimension = dimension => ({
  type: SET_DIMENSION,
  payload: { dimension }
});
export const goToResults = () => ({ type: GO_TO_RESULTS, payload: {} });

export const goToUserIdInput = () => ({
  type: GO_TO_USER_ID_INPUT,
  payload: {}
});

export const resetClicks = () => ({
  type: RESET_CLICKS,
  payload: {}
});

export const createElement = id => ({
  type: CREATE_ELEMENT,
  payload: { id }
});

export const hitElement = key => ({
  type: HIT_ELEMENT,
  payload: { key }
});

export const missElement = key => ({
  type: MISS_ELEMENT,
  payload: { key }
});

export const resetHitsAndMisses = () => ({
  type: RESET_HITS_AND_MISSES,
  payload: {}
});

export const toggleIncentives = currentState => ({
  type: TOGGLE_INCENTIVES,
  payload: { currentState }
});

export const saveClick = click => ({ type: SAVE_CLICK, payload: { click } });

export const startGame = () => ({ type: START_GAME, payload: {} });

export const changeActiveRows = activeRows => ({
  type: CHANGE_ACTIVE_ROWS,
  payload: { activeRows }
});

export const changeNumberOfActiveRows = rollback => ({
  type: CHANGE_NUMBER_OF_ACTIVE_ROWS,
  payload: { rollback }
});

export const changeNumberOfElementsToCreate = rollback => ({
  type: CHANGE_NUMBER_OF_ELEMENTS_TO_CREATE,
  payload: { rollback }
});

export const changeIncentives = rollback => ({
  type: CHANGE_INCENTIVES,
  payload: { rollback }
});

export const saveRound = (round, hits, misses, clicks, dimensionProperty) => ({
  type: SAVE_ROUND,
  payload: { round, hits, misses, clicks, dimensionProperty }
});
export const nextRound = () => ({
  type: NEXT_ROUND,
  payload: {}
});
export const setRollback = () => ({
  type: SET_ROLLBACK,
  payload: {}
});

// Actions to backend (firebase)
export const submitResultsToDB = (
  results,
  userId,
  callback = null
) => dispatch => {
  dispatch(storeInDB(results));
  return firebaseApp
    .database()
    .ref(`/${userId}`)
    .set({ results })
    .then(
      r => {
        if (callback) {
          callback(true, r);
        }
        dispatch(storeInDBSuccess(r));
      },
      e => {
        if (callback) {
          callback(false, e);
        }
        dispatch(storeInDBError(e));
      }
    );
};

// actions recieved by success or error
function storeInDB(results) {
  return {
    type: STORE_IN_DB,
    payload: results
  };
}

function storeInDBSuccess(result) {
  return {
    type: STORE_IN_DB_SUCCESS,
    payload: result
  };
}

function storeInDBError(error) {
  return {
    type: STORE_IN_DB_ERROR,
    payload: error
  };
}
