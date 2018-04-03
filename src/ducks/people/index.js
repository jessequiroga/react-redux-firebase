import { appName } from "../../config";
import { Record, OrderedMap } from "immutable";
import {
  put,
  call,
  all,
  take,
  fork,
  spawn,
  cancel,
  cancelled
} from "redux-saga/effects";
import { delay, eventChannel } from "redux-saga";
import { generateID } from "../helpers";
import firebase from "firebase";
import { fbDataToEntities } from "../helpers";
import { createSelector } from "reselect";

export const moduleName = "people";
const prefix = `${appName}/${moduleName}`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`;
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`;
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`;

const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap({})
});

const PersonRecord = Record({
  uid: null,
  firstName: null,
  lastName: null,
  email: null
});

//REDUCER
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_START:
      return state.set("loading", true);
    case FETCH_ALL_SUCCESS:
      return state
        .set("loading", false)
        .set("loaded", true)
        .set("entities", fbDataToEntities(payload, PersonRecord));
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
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  };
}
export function loadAllPerson() {
  return {
    type: FETCH_ALL_REQUEST
  };
}

/**
 * SAGAS
 **/
export const addPersonSaga = function*() {
  while (true) {
    const action = yield take(ADD_PERSON_REQUEST);

    const id = generateID();

    const ref = firebase.database().ref(`person/${id}`);

    yield call([ref, ref.set], {
      ...action.payload
    });

    yield put({
      type: ADD_PERSON
    });
  }
};

export const loadAllPersonSaga = function*() {
  while (true) {
    yield take(FETCH_ALL_REQUEST);

    yield put({
      type: FETCH_ALL_START
    });

    const ref = firebase.database().ref("person");

    const data = yield call([ref, ref.once], "value");

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    });
  }
};

// export const backgroundSyncSaga = function*() {
//   try {
//     while (true) {
//       yield call(console.log, "===backgroundSyncSaga");
//       yield delay(2000);
//     }
//   } finally {
//     if (yield cancelled) {
//       console.log("===", "canseled by saga");
//     } else {
//       console.log("===", "canseled by some error");
//     }
//   }
// };

// export const cancelSyncSAGA = function*() {
//   const task = yield fork(backgroundSyncSaga);

//   yield delay(6000);
//   yield cancel(task);
// };

const createPeopleSocket = () =>
  eventChannel(emmit => {
    const ref = firebase.database().ref("person");
    const callback = data => emmit({ data });
    ref.on("value", callback);

    return () => ref.off("value", callback);
  });

export const realtimeSync = function*() {
  const channel = yield call(createPeopleSocket);

  while (true) {
    const { data } = yield take(channel);

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data.val()
    });
  }
};

export function* saga() {
  yield spawn(realtimeSync);
  yield all([addPersonSaga(), loadAllPersonSaga()]);
}

//========= AC ====================
