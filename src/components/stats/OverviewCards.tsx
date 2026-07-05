import React from 'react';
import { ExtendedStats } from '../../api/statsService';

interface OverviewCardsProps {
  stats: ExtendedStats;
}

const KpiCard = ({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) => (
  <div className="relative flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden group hover:border-white/20 transition-all duration-300">
    <div
      className={`absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl ${color}`}
    />
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}
    >
      {icon}
    </div>
    <div>
      <p className="text-neutral-400 text-xs font-medium tracking-wider uppercase">
        {label}
      </p>
      <p className="text-white text-3xl font-bold mt-1 tabular-nums">{value}</p>
      {sub && <p className="text-neutral-500 text-xs mt-1">{sub}</p>}
    </div>
  </div>
);

export const OverviewCards: React.FC<OverviewCardsProps> = ({ stats }) => {
  const passRate =
    stats.total_submissions > 0
      ? Math.round((stats.total_passed / stats.total_submissions) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        color="bg-emerald-400"
        icon={
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        }
        label="Bài đã thành thạo"
        value={stats.total_cards_mastered}
        sub={`${stats.total_passed} lần passed tổng cộng`}
      />
      <KpiCard
        color="bg-orange-400"
        icon={
          <svg
            className="w-5 h-5 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
        }
        label="Streak hiện tại"
        value={`${stats.current_streak} ngày`}
        sub={`Kỷ lục: ${stats.longest_streak} ngày`}
      />
      <KpiCard
        color="bg-blue-400"
        icon={
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
        label="Tổng lần submit"
        value={stats.total_submissions}
        sub={`Tỷ lệ passed: ${passRate}%`}
      />
      <KpiCard
        color="bg-purple-400"
        icon={
          <svg
            className="w-5 h-5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        }
        label="Tỷ lệ ghi nhớ"
        value={`${stats.average_retention_rate}%`}
        sub="FSRS retention rate"
      />
    </div>
  );
};
