import {
  combineReducers,
  compose,
  legacy_createStore
} from "redux";

import itemReducer from "./itemReducer";

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStore() {
  return legacy_createStore(
    combineReducers({
      item: itemReducer,
    }),
    compose(
      ReactReduxDevTools,
    )
  );
}

export default configureStore;
