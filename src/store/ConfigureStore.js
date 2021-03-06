import { createStore, combineReducers } from "redux";
import expenseReducer from "../reducers/Expenses";
import filterReducer from "../reducers/Filters";

//store creation

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
