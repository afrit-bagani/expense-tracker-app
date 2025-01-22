// artifical wait as data store to local items
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 700));

const generateRandomColor = () => {
  const existingBudgetsLength = fetchData("Budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 65% 50%`;
};

// Local Storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// get all item from local storage
export const getAllMatchingItems = ({ catagory, key, value }) => {
  const data = fetchData(catagory) ?? [];
  return data.filter((item) => item[key] === value);
};

//delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};
// budget create
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(), // create random value
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? []; // is there is not budgets it return empty arr
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};
//  create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(), // create random value
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? []; // is there is not expense it return empty arr
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((accumulator, expense) => {
    // check expenses.id === budgetID I passed
    if (expense.budgetId !== budgetId) return accumulator;

    // add the current amount to my total
    return (accumulator += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocalString = (epoch) => {
  return new Date(epoch).toLocaleDateString();
};
// Formating percentage
export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// format currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};
