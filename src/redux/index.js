import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import history from "../history";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from 'redux-saga'
import {peopleRootSaga} from '../ducks/people'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
  thunk,
  logger
);

const store = createStore(reducer, enhancer);
window.store = store;


sagaMiddleware.run(peopleRootSaga)

export default store;
