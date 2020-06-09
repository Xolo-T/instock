import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "../reducers/root_reducer";

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

export default configureStore;
