import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

const AddBudgetForm = () => {
  const fetcher = useFetcher(); // for tracking state
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus(); // focus to 1st input
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g. , Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.1"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g. , ₹ 250"
            inputMode="decimal"
            required
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button className="btn btn--dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <FaRupeeSign width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
