import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./Components/RouterComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from './Store/Reducers/reducer';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
  <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
