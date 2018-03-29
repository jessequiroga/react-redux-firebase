import firebase from "firebase";
import { Record } from "immutable";
import { appName } from "../config";
//Actions
export const moduleName = "auth";
const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

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
    default:
      return state;
  }
}

//AC
export function signUp(user) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_REQUEST
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(user =>
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )
      .catch(error =>
        dispatch({
          type: SIGN_UP_ERROR,
          payload: { error }
        })
      );
  };
}
