import { useMemo } from "react";
import { useAppSelector } from "../services/helper/redux";
import { Paper, Typography, Box, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORY_COLORS } from "../services/json/transaction.json";

const RecentTransactions = () => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const navigate = useNavigate();

  const recent = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  if (recent.length === 0) {
    return (
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-2xl p-6">
        <h3 className="text-sm font-bold tracking-[0.12em] text-[#6b7280] uppercase mb-4">
          Recent Transactions
        </h3>
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          }}
        >
          <Typography sx={{ color: "#e2e8f0" }}>
            No transactions yet
          </Typography>
          <Typography sx={{ color: "#6b7280", fontSize: 13 }}>
            Add your first transaction to see it here.
          </Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] border border-[#1f2937] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold tracking-[0.12em] text-[#6b7280] uppercase">
          Recent Transactions
        </h3>
        <Button
          size="small"
          endIcon={<ArrowRight size={14} />}
          onClick={() => navigate("/transactions")}
          sx={{ color: "#38bdf8", textTransform: "none", fontSize: 12 }}
        >
          View All
        </Button>
      </div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {recent.map((t) => (
          <Box
            key={t.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 2,
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#374151",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Box>
              <Typography sx={{ color: "#e2e8f0", fontWeight: 500, fontSize: 14 }}>
                {t.title}
              </Typography>
              <Chip
                label={t.category}
                size="small"
                sx={{
                  mt: 0.5,
                  backgroundColor: `${CATEGORY_COLORS[t.category]}20`,
                  color: CATEGORY_COLORS[t.category],
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: 10,
                  height: 20,
                }}
              />
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  color: t.type === "income" ? "#22c55e" : "#ef4444",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: 11 }}>
                {t.date}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default RecentTransactions;
