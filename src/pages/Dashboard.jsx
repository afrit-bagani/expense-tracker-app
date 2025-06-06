import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
// helper function
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  wait,
} from "../helper";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}
export async function dashboardAction({ request }) {
  await wait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
      // return toast.success(`${values.userName}  You can Procced`);
    } catch (error) {
      throw new Error("There is a problem creating your acoount");
    }
    // Create Budge
  } else if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budge Created");
    } catch (error) {
      throw new Error("There was a problem creating your budget");
    }
  } else if (_action === "createExpense") {
    try {
      // create an expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (error) {
      throw new Error("There was a problem creating your expense");
    }
  } else if (_action === "deleteExpense") {
    try {
      // create an expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success(`Expense Deleted.`);
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses.sort(
                        (a, b) => b.createdAt - a.createdAt
                      )}
                    />
                    {expenses.length > 3 && (
                      <Link to="expenses" className="btn btn--dark">
                        View All Expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Personal Budgeting Is The Secrect To Financial Freedom. Start
                  Your Journey Today.
                </p>
                <p>Create a budget to get started</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
