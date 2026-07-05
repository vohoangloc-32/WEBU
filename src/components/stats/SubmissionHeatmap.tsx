import React, { useMemo } from 'react';
import { SubmissionHistoryRecord } from '../../api/statsService';

interface SubmissionHeatmapProps {
  data: SubmissionHistoryRecord[];
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const getIntensity = (count: number): string => {
  if (count === 0) return 'bg-white/[0.04]';
  if (count === 1) return 'bg-emerald-900/70';
  if (count === 2) return 'bg-emerald-700/80';
  if (count <= 4) return 'bg-emerald-500/80';
  return 'bg-emerald-400';
};

export const SubmissionHeatmap: React.FC<SubmissionHeatmapProps> = ({
  data,
}) => {
  const { weeks, monthLabels } = useMemo(() => {
    const countMap = new Map(data.map((d) => [d.date, d.count]));

    // Build 26 weeks (6 months) of data ending today
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7 * 26 + 1);
    // Align to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: { date: string; count: number }[][] = [];
    const monthLabels: { month: string; col: number }[] = [];
    const currentDate = new Date(startDate);
    let lastMonth = -1;

    for (let w = 0; w < 26; w++) {
      const week: { date: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().slice(0, 10);
        const month = currentDate.getMonth();
        if (month !== lastMonth && currentDate <= today) {
          monthLabels.push({ month: MONTHS[month], col: w });
          lastMonth = month;
        }
        week.push({ date: dateStr, count: countMap.get(dateStr) ?? 0 });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return { weeks, monthLabels };
  }, [data]);

  const totalSubmissions = data.reduce((s, d) => s + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Lịch sử Submit</h3>
          <p className="text-neutral-500 text-xs mt-0.5">
            {totalSubmissions} lần submit · {activeDays} ngày hoạt động trong 6
            tháng
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <span>Ít</span>
          {[
            'bg-white/[0.04]',
            'bg-emerald-900/70',
            'bg-emerald-700/80',
            'bg-emerald-500/80',
            'bg-emerald-400',
          ].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>Nhiều</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] pt-5 flex-shrink-0">
          {DAYS.map((day, i) => (
            <div
              key={i}
              className="h-3 w-7 text-[9px] text-neutral-600 flex items-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Month labels */}
          <div className="flex gap-1 mb-1 h-4">
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.col === wi);
              return (
                <div
                  key={wi}
                  className="w-3 flex-shrink-0 text-[9px] text-neutral-500"
                >
                  {label?.month ?? ''}
                </div>
              );
            })}
          </div>
          {/* Cells */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} submissions`}
                    className={`w-3 h-3 rounded-sm transition-all duration-150 cursor-default hover:ring-1 hover:ring-white/30 ${getIntensity(day.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
