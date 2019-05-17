import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore } from "redux";

const defaultTrainingTimes = 15;

const initialState = {
  video: "",
  magikarp: 0,
  predictions: [],
  classifier: "",
  textToRemember: "",
  count: defaultTrainingTimes,
  commentOne: "I don't know anything.",
  commentTwo: "I remembered something!"
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIDEO":
      return Object.assign({}, state, { video: action.video });
    case "SWITCH_LEVEL":
      if (state.magikarp >= 2) {
        return Object.assign({}, state, { magikarp: 0 });
      } else {
        return Object.assign({}, state, { magikarp: state.magikarp + 1 });
      }
    case "TEXT_REMEMBER":
      return Object.assign({}, state, { textToRemember: action.text });
    case "COUNT_MINUS":
      return Object.assign({}, state, { count: state.count - 1 });
    case "RESET_COUNT":
      return Object.assign({}, state, { count: defaultTrainingTimes });
    case "CLASSIFY":
      return Object.assign({}, state, { classifier: action.classifier });
    case "SET_PREDICTION":
      return Object.assign({}, state, { predictions: action.predictions });
    case "CLEAR_PREDICTION":
      return Object.assign({}, state, { predictions: [] });
    default:
      return state;
  }
};

const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
