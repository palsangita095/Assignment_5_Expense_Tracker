import type {
  TransactionCategory,
  TransactionType,
} from "../../typescript/interface/transaction.interface";

export const INCOME_CATEGORIES: { value: TransactionCategory; label: string }[] = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "investment", label: "Investment" },
  { value: "other", label: "Other" },
];

export const EXPENSE_CATEGORIES: { value: TransactionCategory; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export const ALL_CATEGORIES: { value: TransactionCategory; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "investment", label: "Investment" },
  { value: "other", label: "Other" },
];

export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  food: "#ef4444",
  transport: "#3b82f6",
  entertainment: "#a855f7",
  shopping: "#ec4899",
  health: "#10b981",
  education: "#f59e0b",
  salary: "#22c55e",
  freelance: "#06b6d4",
  investment: "#8b5cf6",
  other: "#6b7280",
};

export const TRANSACTION_TYPES: { value: TransactionType; label: string }[] = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];
