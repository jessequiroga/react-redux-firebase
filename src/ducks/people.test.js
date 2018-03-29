import { addPersonSaga, peopleRootSaga, ADD_PERSON, ADD_PERSON_REQUEST } from "./people";
import { call, put} from "redux-saga/effects";
import { generateID } from "./helpers";

it("Should dispatch person with ID", () => {
  const person = {
    firstName: "Oleg",
    email: "olemingaleev@yandex.ru"
  };

  const saga = addPersonSaga({
    type: ADD_PERSON_REQUEST,
    payload: person
  })
  expect(saga.next().value).toEqual(call(generateID))

  const id = generateID();

  expect(saga.next(id).value).toEqual(put({
    type: ADD_PERSON,
    payload: {id}
  }));
});
