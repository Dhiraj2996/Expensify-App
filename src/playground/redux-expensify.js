import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

console.log("Redux expensify");

//ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id: id,
  updates,
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});
//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

//SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

//SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

//expense reducer
const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter((expense) => expense.id != action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        }
        return expense;
      });
    default:
      return state;
  }
};

//filters reducer
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    default:
      return state;
  }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((exp) => {
      const startDateMatch =
        typeof startDate !== "number" || exp.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || exp.createdAt <= endDate;
      const textMatch =
        !!!text || exp.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === "amount") {
        return a.amount > b.amount ? -1 : 1;
      }
      return -1;
    });
};

//store creation
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

store.dispatch(
  addExpense({ description: "rent", amount: 7000, createdAt: 1000 })
);
const coffeeExpense = store.dispatch(
  addExpense({ description: "coffee", amount: 50, createdAt: -1000 })
);
const teaExpense = store.dispatch(
  addExpense({ description: "tea", amount: 10 })
);
// console.log(teaExpense);

// store.dispatch(removeExpense({ id: teaExpense.expense.id }));

// store.dispatch(editExpense(coffeeExpense.expense.id, { amount: 200 }));

store.dispatch(setTextFilter("Cof"));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(100));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1500));

const demoState = {
  expenses: [
    {
      id: "qwerty",
      description: "Nov Rent",
      note: "Rent details",
      amount: "7000",
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date or amount
    startDate: undefined,
    endDate: undefined,
  },
};

// let person = {
//   name: "jen",
//   age: 24,
// };
// console.log({
//   ...person,
//   addr: "India",
// });
