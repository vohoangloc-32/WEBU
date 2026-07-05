import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ExtendedStats } from '../../api/statsService';

interface DifficultyBarChartProps {
  stats: ExtendedStats;
}

const DIFFICULTY_COLORS: Record<string, { solved: string; fill: string }> = {
  Easy: { solved: '#34d399', fill: 'rgba(52,211,153,0.15)' },
  Medium: { solved: '#fbbf24', fill: 'rgba(251,191,36,0.15)' },
  Hard: { solved: '#f87171', fill: 'rgba(248,113,113,0.15)' },
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="text-neutral-400 mb-1 font-semibold">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mt-1">
          <span className="text-neutral-300">Đã solved:</span>
          <span className="text-white font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const DifficultyBarChart: React.FC<DifficultyBarChartProps> = ({ stats }) => {
  const { solved_by_difficulty } = stats;

  const chartData = [
    { name: 'Easy', solved: solved_by_difficulty.Easy },
    { name: 'Medium', solved: solved_by_difficulty.Medium },
    { name: 'Hard', solved: solved_by_difficulty.Hard },
  ];

  const total =
    solved_by_difficulty.Easy + solved_by_difficulty.Medium + solved_by_difficulty.Hard;

  return (
    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">Phân phối theo độ khó</h3>
        <p className="text-neutral-500 text-xs mt-0.5">Số bài đã giải (Passed) theo mức độ</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 mb-4">
        {chartData.map((d) => (
          <div key={d.name} className="flex-1 rounded-xl p-3 text-center" style={{ background: DIFFICULTY_COLORS[d.name].fill }}>
            <p style={{ color: DIFFICULTY_COLORS[d.name].solved }} className="text-2xl font-bold">
              {d.solved}
            </p>
            <p className="text-neutral-400 text-[10px] mt-0.5">{d.name}</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="solved" name="Đã solved" radius={[6, 6, 0, 0]}>
            {chartData.map((d) => (
              <Cell key={d.name} fill={DIFFICULTY_COLORS[d.name].solved} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-center text-neutral-600 text-xs mt-2">{total} bài đã giải tổng cộng</p>
    </div>
  );
};
