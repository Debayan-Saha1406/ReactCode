import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./Components/RouterComponent";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { sideBarReducer } from "./Store/Reducers/sideBarReducer";
import { navBarReducer } from "./Store/Reducers/navBarReducer";
import { adminReducer } from "./Store/Reducers/adminReducer";
import thunk from "redux-thunk";
import { UIReducer } from "./Store/Reducers/UIReducer";
import { UserReducer } from "./Store/Reducers/userReducer";

const rootReducer = combineReducers({
  sideBarReducer,
  navBarReducer,
  userDetails: adminReducer, //Need To change the userDetails to adminDetails
  uiDetails: UIReducer,
  loggedInUserInfo : UserReducer
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
