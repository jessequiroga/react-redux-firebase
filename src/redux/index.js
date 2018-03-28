import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import history from "../history";
import { routerMiddleware } from "react-router-redux";

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger);

const store = createStore(reducer, enhancer);

window.store = store;

export default store;