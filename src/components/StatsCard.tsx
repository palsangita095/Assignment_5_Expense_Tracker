import type { ReactNode } from "react";

const StatsCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
}) => {
  return (
    <div className="bg-[#0d1117] border border-[#1f2937] rounded-2xl p-6 flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold tracking-[0.12em] text-[#6b7280] uppercase">
          {title}
        </p>
        <p className="text-2xl font-black text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
