import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import {
  formatCurrency,
  formatDateToLocalString,
  getAllMatchingItems,
} from "../helper";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    catagory: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          {/*what to delete*/}
          <input type="hidden" name="_action" value="deleteExpense" />
          {/*for delete require data*/}
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
