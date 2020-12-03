import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/Expenses";

const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    {props.expenses.length > 0 && (
      <ol>
        {props.expenses.map((expense) => (
          <li key={expense.id}>
            <ExpenseListItem expense={expense} />
          </li>
        ))}
      </ol>
    )}
    {!props.expenses.length && <p>No Expenses</p>}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
