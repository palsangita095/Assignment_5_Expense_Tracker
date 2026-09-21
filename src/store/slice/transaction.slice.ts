import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Transaction,
  TransactionPayload,
  TransactionState,
} from "../../typescript/interface/transaction.interface";

const STORAGE_KEY = "expense-tracker-transactions";

const initialState: TransactionState = {
  isLoading: false,
  isError: null,
  transactions: [],
};

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return rejectWithValue("Failed to fetch transactions");
    }
  },
);

export const addTransaction = createAsyncThunk(
  "transaction/addTransaction",
  async (payload: TransactionPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { transaction: { transactions: Transaction[] } };
      const newTransaction: Transaction = { ...payload, id: Date.now().toString() };
      const updated = [...state.transaction.transactions, newTransaction];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newTransaction;
    } catch {
      return rejectWithValue("Failed to add transaction");
    }
  },
);

export const updateTransaction = createAsyncThunk(
  "transaction/updateTransaction",
  async (payload: TransactionPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { transaction: { transactions: Transaction[] } };
      const updated = state.transaction.transactions.map((t) =>
        t.id === payload.id ? { ...t, ...payload } : t,
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return payload as Transaction;
    } catch {
      return rejectWithValue("Failed to update transaction");
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { transaction: { transactions: Transaction[] } };
      const updated = state.transaction.transactions.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return id;
    } catch {
      return rejectWithValue("Failed to delete transaction");
    }
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        const idx = state.transactions.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.transactions[idx] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
