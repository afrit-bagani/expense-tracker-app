import { redirect } from "react-router-dom";
// helper function
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  toast.success("You've deleted your account !!!");
  // redirect
  return redirect("/");
}
