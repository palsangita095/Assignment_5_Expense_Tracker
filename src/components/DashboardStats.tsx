import { useMemo } from "react";
import { useAppSelector } from "../services/helper/redux";
import StatsCard from "./StatsCard";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const DashboardStats = () => {
  const { transactions } = useAppSelector((state) => state.transaction);

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Income"
        value={`$${stats.totalIncome.toLocaleString()}`}
        icon={<TrendingUp size={22} color="#22c55e" />}
        color="#22c55e"
      />
      <StatsCard
        title="Total Expenses"
        value={`$${stats.totalExpense.toLocaleString()}`}
        icon={<TrendingDown size={22} color="#ef4444" />}
        color="#ef4444"
      />
      <StatsCard
        title="Balance"
        value={`$${stats.balance.toLocaleString()}`}
        icon={<Wallet size={22} color="#38bdf8" />}
        color="#38bdf8"
      />
    </div>
  );
};

export default DashboardStats;
