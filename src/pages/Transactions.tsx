import { useEffect, useState, useMemo } from "react";
import { Container, Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../services/helper/redux";
import { fetchTransactions, deleteTransaction } from "../store/slice/transaction.slice";
import {
  setCategoryFilter,
  setTypeFilter,
  resetFilters,
} from "../store/slice/filter.slice";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import {
  ALL_CATEGORIES,
  TRANSACTION_TYPES,
} from "../services/json/transaction.json";
import type { Transaction } from "../typescript/interface/transaction.interface";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);
  const filter = useAppSelector((state) => state.filter);

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Transaction | null>(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filter.category !== "all" && t.category !== filter.category)
        return false;
      if (filter.type !== "all" && t.type !== filter.type) return false;
      return true;
    });
  }, [transactions, filter]);

  const handleEdit = (t: Transaction) => {
    setEditData(t);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const handleOpenForm = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditData(null);
    setFormOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ height: "calc(100vh - 64px)", py: 4 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage all your income and expenses
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={handleOpenForm}
          sx={{
            backgroundColor: "#059669",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#047857" },
          }}
        >
          Add Transaction
        </Button>
      </Box>

      
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ fontSize: 13 }}>Category</InputLabel>
          <Select
            value={filter.category}
            label="Category"
            onChange={(e) =>
              dispatch(
                setCategoryFilter(
                  e.target.value as typeof filter.category,
                ),
              )
            }
            sx={{ fontSize: 13 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {ALL_CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel sx={{ fontSize: 13 }}>Type</InputLabel>
          <Select
            value={filter.type}
            label="Type"
            onChange={(e) =>
              dispatch(setTypeFilter(e.target.value as typeof filter.type))
            }
            sx={{ fontSize: 13 }}
          >
            <MenuItem value="all">All Types</MenuItem>
            {TRANSACTION_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          size="small"
          onClick={() => dispatch(resetFilters())}
          sx={{ color: "#6b7280", textTransform: "none", fontSize: 13 }}
        >
          Reset Filters
        </Button>

        <Typography sx={{ color: "#6b7280", fontSize: 12, ml: "auto" }}>
          {filteredTransactions.length} transaction(s) found
        </Typography>
      </Box>

      
      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

     
      <TransactionForm
        open={formOpen}
        onClose={handleCloseForm}
        editData={editData}
      />
    </Container>
  );
};

export default Transactions;
