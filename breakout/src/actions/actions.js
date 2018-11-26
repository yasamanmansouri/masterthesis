import {
  SET_USER_ID,
  SET_NEW_SPEED,
  SET_DIMENSION,
  SAVE_ROUND,
  GO_TO_RESULTS,
  STORE_IN_DB,
  STORE_IN_DB_SUCCESS,
  STORE_IN_DB_ERROR,
  GO_TO_USER_ID_INPUT,
  SAVE_CLICK,
  RESET_CLICKS
} from "../constants/ActionTypes.js";

import { firebaseApp } from "../firebase.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });

export const setNewSpeed = rollback => ({
  type: SET_NEW_SPEED,
  payload: { rollback }
});

export const saveClick = click => ({ type: SAVE_CLICK, payload: { click } });

export const resetClicks = () => ({
  type: RESET_CLICKS,
  payload: {}
});

export const selectDimension = dimension => ({
  type: SET_DIMENSION,
  payload: { dimension }
});

export const saveRound = (
  round,
  destroyedBricks,
  losses,
  clicks,
  dimensionProperty
) => ({
  type: SAVE_ROUND,
  payload: { round, destroyedBricks, losses, clicks, dimensionProperty }
});

export const goToResults = () => ({ type: GO_TO_RESULTS, payload: {} });

export const goToUserIdInput = () => ({
  type: GO_TO_USER_ID_INPUT,
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
