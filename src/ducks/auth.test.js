import {
  signUp,
  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from "./auth";
import firebase from "firebase";
import { take, call, put } from "redux-saga/effects";

it("Component AUth", () => {
  const user = {
    email: "example22@tst.com",
    password: "sdliuSSdddsd12u8"
  };

  const action = signUp(user);

  expect(action).toEqual({
    type: SIGN_UP_REQUEST,
    payload: user
  });

  const testSage = signUpSaga(action);
  const auth = firebase.auth();

  expect(testSage.next().value).toEqual(take(SIGN_UP_REQUEST));

  // const error = new Error;
  
  // expect(testSage.throw(error).value).toEqual(
  //   put({
  //     type: SIGN_IN_ERROR,
  //     payload: error
  //   })
  // );
});
