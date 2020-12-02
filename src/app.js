import React from "react";
import ReactDOM from "react-dom";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/ConfigureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
