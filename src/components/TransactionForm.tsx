import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../services/helper/redux";
import { addTransaction, updateTransaction } from "../store/slice/transaction.slice";
import { transactionSchema } from "../services/validation/transaction.validation";
import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../services/json/transaction.json";
import type {
  Transaction,
  TransactionPayload,
} from "../typescript/interface/transaction.interface";

type TransactionFormType = Omit<TransactionPayload, "id">;

const TransactionForm = ({
  open,
  onClose,
  editData,
}: {
  open: boolean;
  onClose: () => void;
  editData?: Transaction | null;
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormType>({
    resolver: yupResolver(transactionSchema) as Resolver<TransactionFormType>,
    defaultValues: {
      title: "",
      amount: 0,
      type: "expense",
      category: "food",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (editData) {
      reset({
        title: editData.title,
        amount: editData.amount,
        type: editData.type,
        category: editData.category,
        date: editData.date,
      });
    } else {
      reset({
        title: "",
        amount: 0,
        type: "expense",
        category: "food",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [editData, reset, open]);

  const categories =
    selectedType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const onSubmit = (data: TransactionFormType) => {
    if (editData) {
      dispatch(
        updateTransaction({ ...data, id: editData.id }),
      );
    } else {
      dispatch(addTransaction(data));
    }
    reset();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <Box sx={{ padding: 3 }}>
        <DialogTitle sx={{ p: 0, textAlign: "center", mb: 2 }}>
          {editData ? "Edit Transaction" : "Add New Transaction"}
        </DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            placeholder="Enter transaction title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors?.title?.message}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Amount"
            type="number"
            placeholder="Enter amount"
            {...register("amount")}
            error={!!errors.amount}
            helperText={errors?.amount?.message}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Type</InputLabel>
                <Select {...field} label="Type">
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.type.message}
                  </p>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category">
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.category.message}
                  </p>
                )}
              </FormControl>
            )}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Date"
            type="date"
            {...register("date")}
            error={!!errors.date}
            helperText={errors?.date?.message}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 0,
            }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {editData ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default TransactionForm;
