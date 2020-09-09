import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./components/App";
import CombinedReducers from "./reducers/CombinedReducers";
import "./css/styles.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};   //setting the initial state of the app

// create the redux store
const store = createStore(
  CombinedReducers,
  initialState,
  composeEnhancers(applyMiddleware(reduxThunk))      //applying redux-thunk for async operations
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
