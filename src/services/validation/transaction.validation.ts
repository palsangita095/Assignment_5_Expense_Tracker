import * as yup from "yup";

export const transactionSchema = yup.object({
  title: yup.string().required("Title is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  type: yup.string().oneOf(["income", "expense"]).required("Type is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Date is required"),
});
