import { useEffect } from "react";
import { Container } from "@mui/material";
import { useAppDispatch } from "../services/helper/redux";
import { fetchTransactions } from "../store/slice/transaction.slice";
import DashboardStats from "../components/DashboardStats";
import RecentTransactions from "../components/RecentTransactions";
import CategoryChart from "../components/CategoryChart";
import { useAppSelector } from "../services/helper/redux";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Container maxWidth={false} sx={{ height: "calc(100vh - 64px)", py: 4 }}>
      
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Overview of your financial activity
        </p>
      </div>

      
      <div className="mb-6">
        <DashboardStats />
      </div>

      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryChart transactions={transactions} />
        <RecentTransactions />
      </div>
    </Container>
  );
};

export default Dashboard;
