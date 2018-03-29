import firebase from "firebase";
import { Record } from "immutable";
import { appName } from "../config";
import { put, call, cps, all, take } from "redux-saga/effects";
import { push } from "react-router-redux";
//Actions
export const moduleName = "auth";
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;

const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
});

//Reducer
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set("loading", true);
    case SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("user", payload.user)
        .set("error", null);
    case SIGN_UP_ERROR:
      return state.set("loading", false).set("error", payload.error);
    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();
    default:
      return state;
  }
}

//=== ACTION CREATORS ====//
export function signUp(user) {
  return {
    type: SIGN_UP_REQUEST,
    payload: user
  };
}

export function* signUpSaga() {
  const auth = firebase.auth();

  while (true) {
    const action = yield take(SIGN_UP_REQUEST);
    try {
      const user = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      );

      yield put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      });
    } catch (error) {
      yield put({
        type: SIGN_UP_ERROR,
        payload: error
      });
    }
  }
}

export function* watchStatusChange() {
  const auth = firebase.auth();
  try {
    const user = yield cps([auth, auth.onAuthStateChanged]);
  } catch (user) {
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    });
  }
}

export function signOut() {
  return {
    type: SIGN_OUT_REQUEST
  };
}

export function* signOutSaga() {
  const auth = firebase.auth();

  try {
    const action = yield take(SIGN_OUT_REQUEST);
    yield call([auth, auth.signOut]);
    yield put({
      type: SIGN_OUT_SUCCESS
    });
  } catch (error) {}
}

export function* sagaSignUp() {
  yield all([signUpSaga(), watchStatusChange(), signOutSaga()]);
}

//=== ACTION CREATORS ====//
