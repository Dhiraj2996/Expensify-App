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

store.dispatch(
  addExpense({ description: "Rent", amount: 7000, createdAt: 1000 })
);
const coffeeExpense = store.dispatch(
  addExpense({ description: "coffee", amount: 2000, createdAt: -1000 })
);
const teaExpense = store.dispatch(
  addExpense({ description: "tea", amount: 1000 })
);
// console.log(
//   getVisibleExpense(store.getState().expenses, store.getState().filters)
// );
// store.dispatch(setTextFilter("Cof"));
// console.log(
//   getVisibleExpense(store.getState().expenses, store.getState().filters)
// );

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
