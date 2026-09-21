export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "health"
  | "education"
  | "salary"
  | "freelance"
  | "investment"
  | "other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}

export interface TransactionState {
  isLoading: boolean;
  isError: string | null;
  transactions: Transaction[];
}

export interface TransactionPayload {
  id?: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}

export interface FilterState {
  category: TransactionCategory | "all";
  type: TransactionType | "all";
  month: string;
}
