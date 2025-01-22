import { Form, Link } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helper";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/16/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" /*style={{ "--accent": color }}*/>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small style={{ color: "red" }}>{formatCurrency(spent)} spent</small>
        <small style={{ color: "green" }}>
          {formatCurrency(amount - spent)} remaining
        </small>
      </div>
      {showDelete ? (
        <div className="flx-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (
                !confirm(
                  "Are you sure want to permanently delete this budgets ?"
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
