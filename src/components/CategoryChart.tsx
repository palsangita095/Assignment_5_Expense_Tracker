import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { Transaction } from "../typescript/interface/transaction.interface";
import { CATEGORY_COLORS } from "../services/json/transaction.json";

const CategoryChart = ({ transactions }: { transactions: Transaction[] }) => {
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = expenses.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(categoryMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || "#6b7280",
  }));

  if (data.length === 0) {
    return (
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-2xl p-6 flex flex-col items-center justify-center h-[300px]">
        <p className="text-[#6b7280] text-sm">No expense data to chart</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] border border-[#1f2937] rounded-2xl p-6">
      <h3 className="text-sm font-bold tracking-[0.12em] text-[#6b7280] uppercase mb-4">
        Category Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: 8,
              color: "#e2e8f0",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#9ca3af" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
