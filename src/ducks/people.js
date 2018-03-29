import { appName } from "../config";
import { Record, List } from "immutable";
import { put, call, takeEvery, all } from "redux-saga/effects";
import { generateID } from "./helpers";

export const moduleName = "people";
//ACTIONS
const ADD_PERSON = `${appName}/${moduleName}/ADD_PERSON`;
const ADD_PERSON_REQUEST = `${appName}/${moduleName}/ADD_PERSON_REQUEST`;

const ReducerState = Record({
  entities: new List([])
});

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
});

//REDUCER
export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON:
      return state.update("entities", entities =>
        entities.push(new PersonRecord(payload.person))
      );
    default:
      return state;
  }
}

//========= AC ====================
export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: person
  };
}

//Middleware SAGA
export function* addPersonSaga(action) {
  const id = yield call(generateID)
  yield put({
    type: ADD_PERSON,
    payload: { ...action.person, id }
  });
}

//SAGA
export function* sagaAddPerson() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga);
}

export function* peopleRootSaga() {
  yield all([sagaAddPerson()]);
}
//========= AC ====================
