import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeExpense } from "../actions/ExpensesActions";

const ExpenseListItem = (props) => {
  const { description, amount, createdAt, id } = props.expense;
  const editUrl = "/edit/" + id;
  return (
    <div>
      <Link to={editUrl}>
        <h2>{description}</h2>
      </Link>

      <p>
        {amount}:{createdAt}
      </p>
      
    </div>
  );
};

export default ExpenseListItem;
