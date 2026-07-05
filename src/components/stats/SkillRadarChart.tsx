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
    <div className="bg-[#111827] border border-white/10 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="text-white font-bold mb-2">{d.tag}</p>
      <div className="space-y-1 text-neutral-400">
        <div>Skill Score: <span className="text-emerald-400 font-bold">{d.skill_score}</span>/100</div>
        <div>Pass Rate: <span className="text-blue-400">{d.pass_rate}%</span></div>
        <div>Passed: <span className="text-neutral-200">{d.passed_count}/{d.total_attempts}</span></div>
      </div>
    </div>
  );
};

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  // Lấy tối đa 8 tags nổi bật (có tổng lần làm nhiều nhất)
  const chartData = data
    .slice(0, 8)
    .map((d) => ({
      ...d,
      subject: d.tag.length > 12 ? d.tag.slice(0, 10) + '…' : d.tag,
    }));

  if (chartData.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex flex-col items-center justify-center h-64">
        <div className="text-4xl mb-3">🕸️</div>
        <p className="text-neutral-400 text-sm">Chưa có dữ liệu kỹ năng</p>
        <p className="text-neutral-600 text-xs mt-1">Submit thêm bài để thấy biểu đồ kỹ năng</p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
      <div className="mb-2">
        <h3 className="text-white font-semibold text-sm">Phân phối kỹ năng</h3>
        <p className="text-neutral-500 text-xs mt-0.5">
          Điểm kỹ năng = Tỷ lệ passed × FSRS retention rate
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.07)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#9ca3af', fontSize: 10 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#6b7280', fontSize: 8 }}
            tickCount={4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Skill Score"
            dataKey="skill_score"
            stroke="#7c8dff"
            fill="#7c8dff"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legend bảng nhỏ */}
      <div className="mt-2 grid grid-cols-2 gap-1">
        {data.slice(0, 6).map((d) => (
          <div key={d.tag} className="flex items-center justify-between px-2 py-1 rounded-lg bg-white/[0.03]">
            <span className="text-neutral-400 text-[10px] truncate">{d.tag}</span>
            <span className="text-white text-[10px] font-bold ml-2">{d.skill_score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
