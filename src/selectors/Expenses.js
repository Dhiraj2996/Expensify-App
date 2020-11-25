import moment from "moment";

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((exp) => {
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(moment(exp.createdAt), "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(moment(exp.createdAt), "day")
        : true;
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

export default getVisibleExpenses;
