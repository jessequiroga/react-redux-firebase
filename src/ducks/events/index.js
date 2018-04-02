import { appName } from "../../config";
import { Record, OrderedMap } from "immutable";
import firebase from "firebase";
import { all, take, put, call, select } from "redux-saga/effects";
import { createSelector } from "reselect";
import { fbDataToEntities } from "../helpers";

/**
 * Constants
 **/
export const moduleName = "events";
const prefix = `${appName}/${moduleName}`;
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;
export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`;
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`;
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`;

/**
 * REDUCER
 **/
const EventItemRecord = Record({
  uid: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
});
export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_REQUEST:
    case FETCH_LAZY_START:
      return state.set("loading", true);
    case FETCH_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("entities", fbDataToEntities(payload, EventItemRecord));
    case FETCH_LAZY_SUCCESS:
      return state
        .set("loading", false)
        .mergeIn(["entities"], fbDataToEntities(payload, EventItemRecord))
        .set("loading", Object.keys(payload).length < 10);
    default:
      return state;
  }
}

/**
 * SELECTORS
 **/

export const stateSelector = state => state[moduleName];
export const entitiesSelector = createSelector(
  stateSelector,
  state => state.entities
);
export const eventsListSelector = createSelector(entitiesSelector, entities =>
  entities.valueSeq().toArray()
);

/**
 * AC
 **/

export function fetchAll() {
  return {
    type: FETCH_ALL_REQUEST
  };
}

export function fetchLazy() {
  return {
    type: FETCH_LAZY_REQUEST
  };
}

/**
 * SAGAS
 **/
export const fetchAllSaga = function*() {
  while (true) {
    yield take(FETCH_ALL_REQUEST);

    const ref = firebase.database().ref("events");

    const data = yield call([ref, ref.once], "value");

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    });
  }
};

export const fetchLazySaga = function*() {
  while (true) {
    yield take(FETCH_LAZY_REQUEST);

    const state = yield select(stateSelector);

    if (state.loading) continue;

    yield put({
      type: FETCH_LAZY_START
    });

    const lastEvent = state.entities.last();

    const ref = firebase
      .database()
      .ref("events")
      .orderByKey()
      .limitToFirst(10)
      .startAt(lastEvent ? lastEvent.uid : "");

    const data = yield call([ref, ref.once], "value");

    yield put({
      type: FETCH_LAZY_SUCCESS,
      payload: data.val()
    });
  }
};

export function* saga() {
  yield all([fetchAllSaga(), fetchLazySaga()]);
}
