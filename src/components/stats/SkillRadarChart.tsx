import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SkillStat } from '../../api/statsService';

interface SkillRadarChartProps {
  data: SkillStat[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: SkillStat }[];
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-tonal-a20 border border-tonal-a30 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-neutral-a50 font-bold mb-2 p8">{d.tag}</p>
      <div className="space-y-1 text-neutral-a300 p8">
        <div>
          Skill Score:{' '}
          <span className="text-success-a10 font-bold">{d.skill_score}</span>
          /100
        </div>
        <div>
          Pass Rate: <span className="text-primary-a30">{d.pass_rate}%</span>
        </div>
        <div>
          Passed:{' '}
          <span className="text-neutral-a100">
            {d.passed_count}/{d.total_attempts}
          </span>
        </div>
      </div>
    </div>
  );
};

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  // Lấy tối đa 8 tags nổi bật (có tổng lần làm nhiều nhất)
  const chartData = data.slice(0, 8).map((d) => ({
    ...d,
    subject: d.tag.length > 12 ? d.tag.slice(0, 10) + '…' : d.tag,
  }));

  if (chartData.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-tonal-a20 border border-tonal-a30 flex flex-col items-center justify-center h-64">
        <div className="text-4xl mb-3">🕸️</div>
        <p className="text-neutral-a300 p7">Chưa có dữ liệu kỹ năng</p>
        <p className="text-neutral-a400 p8 mt-1">
          Submit thêm bài để thấy biểu đồ kỹ năng
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-tonal-a20 border border-tonal-a30">
      <div className="mb-2">
        <h3 className="text-neutral-a50 font-semibold p7">Phân phối kỹ năng</h3>
        <p className="text-neutral-a300 p8 mt-0.5">
          Điểm kỹ năng = Tỷ lệ passed × FSRS retention rate
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="var(--color-surface-a30)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'var(--color-neutral-a400)', fontSize: 10 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'var(--color-neutral-a500)', fontSize: 8 }}
            tickCount={4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Score"
            dataKey="skill_score"
            stroke="var(--color-primary-a30)"
            fill="var(--color-primary-a30)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend bảng nhỏ */}
      <div className="mt-2 grid grid-cols-2 gap-1">
        {data.slice(0, 6).map((d) => (
          <div
            key={d.tag}
            className="flex items-center justify-between px-2 py-1 rounded-lg bg-tonal-a30"
          >
            <span className="text-neutral-a300 text-[10px] truncate">
              {d.tag}
            </span>
            <span className="text-neutral-a50 text-[10px] font-bold ml-2">
              {d.skill_score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
