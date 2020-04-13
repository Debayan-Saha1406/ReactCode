import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./Components/RouterComponent";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { sideBarReducer } from "./Store/Reducers/sideBarReducer";
import { navBarReducer } from "./Store/Reducers/navBarReducer";
import { userDetailsReducer } from "./Store/Reducers/userDetailsReducer";
import thunk from "redux-thunk";
import { UIReducer } from "./Store/Reducers/UIReducer";

const rootReducer = combineReducers({
  sideBarReducer,
  navBarReducer,
  userDetails: userDetailsReducer,
  uiDetails: UIReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

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
