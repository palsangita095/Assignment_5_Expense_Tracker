import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../typescript/interface/transaction.interface";
import { CATEGORY_COLORS } from "../services/json/transaction.json";

const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
}) => {
  if (transactions.length === 0) {
    return (
      <Paper
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#0d1117",
          border: "1px solid #1f2937",
        }}
      >
        <Typography variant="h6" sx={{ color: "#e2e8f0" }}>
          No Transactions Yet
        </Typography>
        <Typography sx={{ color: "#6b7280" }}>
          Add your first transaction to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#0d1117",
        border: "1px solid #1f2937",
        borderRadius: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Title
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Amount
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Type
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Category
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Date
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t.id}
              sx={{
                "&:hover": { backgroundColor: "#111827" },
                transition: "background-color 0.2s",
              }}
            >
              <TableCell sx={{ color: "#e2e8f0", fontWeight: 500 }}>
                {t.title}
              </TableCell>
              <TableCell
                sx={{
                  color: t.type === "income" ? "#22c55e" : "#ef4444",
                  fontWeight: 700,
                }}
              >
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Chip
                  label={t.type}
                  size="small"
                  sx={{
                    backgroundColor:
                      t.type === "income" ? "#22c55e20" : "#ef444420",
                    color: t.type === "income" ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontSize: 11,
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={t.category}
                  size="small"
                  sx={{
                    backgroundColor: `${CATEGORY_COLORS[t.category]}20`,
                    color: CATEGORY_COLORS[t.category],
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontSize: 11,
                  }}
                />
              </TableCell>
              <TableCell sx={{ color: "#9ca3af" }}>{t.date}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => onEdit(t)}
                  sx={{ color: "#38bdf8" }}
                >
                  <Pencil size={16} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(t.id)}
                  sx={{ color: "#ef4444" }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
