import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/ConfigureStore";
import getVisibleExpense from "./selectors/Expenses";
import { addExpense } from "./actions/ExpensesActions";
import { setTextFilter } from "./actions/FilterActions";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
