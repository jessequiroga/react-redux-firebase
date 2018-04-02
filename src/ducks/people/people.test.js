import { addPersonSaga, ADD_PERSON, ADD_PERSON_REQUEST } from "./";
import { take, put } from "redux-saga/effects";

it("Should dispatch person with ID", () => {
  const person = {
    firstName: "Test1",
    email: "test1@example.com"
  };

  const saga = addPersonSaga({
    type: ADD_PERSON_REQUEST,
    payload: person
  });

  expect(saga.next().value).toEqual(take(ADD_PERSON_REQUEST));
});


