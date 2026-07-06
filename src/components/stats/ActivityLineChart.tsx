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
    <div className="bg-tonal-a20 border border-tonal-a30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-neutral-a300 mb-2 p8">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 p8">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-neutral-a100">{p.name}:</span>
          <span className="text-neutral-a50 font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ActivityLineChart: React.FC<ActivityLineChartProps> = ({
  data,
}) => {
  const formatted = data.map((d) => ({
    ...d,
    date: d.date.slice(5), // "MM-DD"
  }));

  return (
    <div className="p-5 rounded-2xl bg-tonal-a20 border border-tonal-a30">
      <div className="mb-4">
        <h3 className="text-neutral-a50 font-semibold p7">Hoạt động 30 ngày</h3>
        <p className="text-neutral-a300 p8 mt-0.5">
          Số lần submit Passed vs Failed mỗi ngày
        </p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={formatted}
          margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-surface-a30)"
          />
          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--color-neutral-a400)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fill: 'var(--color-neutral-a400)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: 11,
              color: 'var(--color-neutral-a300)',
              paddingTop: 8,
            }}
          />
          <Line
            type="monotone"
            dataKey="passed"
            name="Passed"
            stroke="var(--color-success-a10)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-success-a10)' }}
          />
          <Line
            type="monotone"
            dataKey="failed"
            name="Failed"
            stroke="var(--color-danger-a10)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-danger-a10)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
