import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = (props) => {
  const { description, amount, createdAt, id } = props.expense;
  const editUrl = "/edit/" + id;
  return (
    <div>
      <Link to={editUrl}>
        <h2>{description}</h2>
      </Link>

      <p>
        {numeral(amount).format("$0,0.00")}-
        {moment(createdAt).format("MMMM Do, YYYY")}
      </p>
    </div>
  );
};

export default ExpenseListItem;
