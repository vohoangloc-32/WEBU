import React, { useEffect, useState } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { OverviewCards } from '@/components/stats/OverviewCards';
import { SubmissionHeatmap } from '@/components/stats/SubmissionHeatmap';
import { ActivityLineChart } from '@/components/stats/ActivityLineChart';
import { SkillRadarChart } from '@/components/stats/SkillRadarChart';
import { DifficultyBarChart } from '@/components/stats/DifficultyBarChart';
import { FsrsProgressTable } from '@/components/stats/FsrsProgressTable';
import {
  statsApi,
  ExtendedStats,
  SkillStat,
  FsrsProgressItem,
} from '@/api/statsService';

const LoadingSection = () => (
  <div className="h-48 rounded-2xl bg-tonal-a20 border border-tonal-a30 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <svg
        className="animate-spin h-7 w-7 text-primary-a30"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="text-neutral-a300 p7">Đang tải dữ liệu...</span>
    </div>
  </div>
);

const ErrorBanner = ({ message }: { message: string }) => (
  <div className="p-4 rounded-2xl bg-danger-a10/10 border border-danger-a10/20 text-danger-a10 p7">
    ⚠️ {message}
  </div>
);

export const Stats: React.FC = () => {
  const [stats, setStats] = useState<ExtendedStats | null>(null);
  const [skillData, setSkillData] = useState<SkillStat[]>([]);
  const [fsrsData, setFsrsData] = useState<FsrsProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('Vui lòng đăng nhập để xem thống kê.');
      setLoading(false);
      return;
    }

    Promise.all([
      statsApi.getStats(),
      statsApi.getSkillStats(),
      statsApi.getFsrsProgress(),
    ])
      .then(([s, sk, fs]) => {
        setStats(s);
        setSkillData(sk);
        setFsrsData(fs);
      })
      .catch((err) => {
        console.error('Stats load error:', err);
        setError('Không thể tải dữ liệu thống kê. Vui lòng thử lại.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-tonal-a10">
      <header className="sticky top-0 z-10 bg-tonal-a10/80 backdrop-blur-xl border-b border-tonal-a20">
        <MainNavigation />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-a10 to-discovery-a50 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
            <h1 className="text-neutral-a50 h5">Statistics</h1>
          </div>
          <p className="text-neutral-a300 p7">
            Tổng quan về hành trình học lập trình của bạn — từ FSRS đến kỹ năng
            thuật toán.
          </p>
        </div>

        {error && <ErrorBanner message={error} />}

        <div className="space-y-6">
          {/* Section 1: KPI Overview */}
          {loading ? (
            <LoadingSection />
          ) : stats ? (
            <OverviewCards stats={stats} />
          ) : null}

          {/* Section 2: Heatmap + Line Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? (
              <>
                <LoadingSection />
                <LoadingSection />
              </>
            ) : stats ? (
              <>
                <SubmissionHeatmap data={stats.submission_history} />
                <ActivityLineChart data={stats.daily_activity} />
              </>
            ) : null}
          </div>

          {/* Section 3: Radar + Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? (
              <>
                <LoadingSection />
                <LoadingSection />
              </>
            ) : (
              <>
                <SkillRadarChart data={skillData} />
                {stats && <DifficultyBarChart stats={stats} />}
              </>
            )}
          </div>

          {/* Section 4: FSRS Table */}
          {loading ? <LoadingSection /> : <FsrsProgressTable data={fsrsData} />}
        </div>
      </main>
    </div>
  );
};

export default Stats;
