import { all } from "redux-saga/effects";

import { sagaAddPerson } from "./people";
import { sagaSignUp } from "./auth";

export function* saga() {
  yield all([sagaAddPerson(), sagaSignUp()]);
}
