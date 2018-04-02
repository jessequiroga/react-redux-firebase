import { all } from "redux-saga/effects";
import { saga as EventsSagas } from "./events";
import { saga as sagaPerson } from "./people";
import { sagaSignUp } from "./auth";

export function* rootSaga() {
  yield all([sagaPerson(), sagaSignUp(), EventsSagas()]);
}
