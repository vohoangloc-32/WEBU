import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailyActivity } from '../../api/statsService';

interface ActivityLineChartProps {
  data: DailyActivity[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="text-neutral-400 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-neutral-300">{p.name}:</span>
          <span className="text-white font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ActivityLineChart: React.FC<ActivityLineChartProps> = ({ data }) => {
  const formatted = data.map((d) => ({
    ...d,
    date: d.date.slice(5), // "MM-DD"
  }));

  return (
    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">Hoạt động 30 ngày</h3>
        <p className="text-neutral-500 text-xs mt-0.5">Số lần submit Passed vs Failed mỗi ngày</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, color: '#9ca3af', paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey="passed"
            name="Passed"
            stroke="#34d399"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#34d399' }}
          />
          <Line
            type="monotone"
            dataKey="failed"
            name="Failed"
            stroke="#f87171"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#f87171' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
