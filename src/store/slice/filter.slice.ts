import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FilterState,
  TransactionCategory,
  TransactionType,
} from "../../typescript/interface/transaction.interface";

const initialState: FilterState = {
  category: "all",
  type: "all",
  month: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<TransactionCategory | "all">) => {
      state.category = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<TransactionType | "all">) => {
      state.type = action.payload;
    },
    setMonthFilter: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    resetFilters: (state) => {
      state.category = "all";
      state.type = "all";
      state.month = "";
    },
  },
});

export const {
  setCategoryFilter,
  setTypeFilter,
  setMonthFilter,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
