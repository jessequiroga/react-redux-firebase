import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import history from "../history";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from '../ducks/saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
  logger
);

const store = createStore(reducer, enhancer);
window.store = store;


sagaMiddleware.run(rootSaga)

export default store;
