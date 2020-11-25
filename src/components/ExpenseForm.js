import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const now = moment();
console.log(now.format("MMM Do, YYYY"));

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? props.expense.amount.toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChanged = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
      this.setState(() => ({
        amount,
      }));
  };
  onDateChange = (createdAt) => {
    this.setState(() => ({ createdAt }));
  };

  onCalendarFocusChange = ({ focused: calendarFocused }) => {
    this.setState(() => ({ calendarFocused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: "Please provide description and amount" }));
    } else {
      //clear
      this.setState(() => ({ error: "" }));

      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="description"
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="number"
          placeholder="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onCalendarFocusChange}
          numberOfMonths={1}
          isOutsideRange={(day) => false}
        />
        <textarea
          placeholder="Add a note for expense(optional)"
          value={this.state.note}
          onChange={this.onNoteChanged}
        ></textarea>
        <button>Add Expense</button>
      </form>
    );
  }
}

export default ExpenseForm;
