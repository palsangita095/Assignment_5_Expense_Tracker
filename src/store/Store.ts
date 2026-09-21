import { combineReducers, configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slice/transaction.slice";
import filterReducer from "./slice/filter.slice";

const STORAGE_KEY = "expense-tracker-transactions";

const persistedTransactions = (() => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
})();

const rootReducer = combineReducers({
  transaction: transactionReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    transaction: {
      isLoading: false,
      isError: null,
      transactions: persistedTransactions,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.transaction.transactions),
  );
});
