import React, { useState } from 'react';
import { FsrsProgressItem } from '../../api/statsService';

interface FsrsProgressTableProps {
  data: FsrsProgressItem[];
}

const STATE_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  new: { label: 'New', color: 'text-neutral-400', bg: 'bg-neutral-800' },
  learning: {
    label: 'Learning',
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/30',
  },
  review: {
    label: 'Review',
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/30',
  },
  relearning: {
    label: 'Relearning',
    color: 'text-red-400',
    bg: 'bg-red-900/30',
  },
};

const RATING_CONFIG: Record<string, { label: string; color: string }> = {
  easy: { label: '😊 Easy', color: 'text-emerald-400' },
  good: { label: '👍 Good', color: 'text-blue-400' },
  hard: { label: '😰 Hard', color: 'text-yellow-400' },
  again: { label: '🔁 Again', color: 'text-red-400' },
};

const DIFF_COLORS: Record<string, string> = {
  Easy: 'text-emerald-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
};

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `Quá hạn ${-diff}d`;
  if (diff === 0) return 'Hôm nay';
  if (diff === 1) return 'Ngày mai';
  return `${diff} ngày nữa`;
};

type SortKey = 'title' | 'state' | 'reps' | 'stability' | 'next_review_date';

export const FsrsProgressTable: React.FC<FsrsProgressTableProps> = ({
  data,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('next_review_date');
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('all');

  const sorted = [...data]
    .filter((d) => {
      const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === 'all' || d.state === stateFilter;
      return matchSearch && matchState;
    })
    .sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      if (sortKey === 'title') {
        av = a.title;
        bv = b.title;
      } else if (sortKey === 'state') {
        av = a.state;
        bv = b.state;
      } else if (sortKey === 'reps') {
        av = a.reps;
        bv = b.reps;
      } else if (sortKey === 'stability') {
        av = a.stability ?? 0;
        bv = b.stability ?? 0;
      } else if (sortKey === 'next_review_date') {
        av = a.next_review_date ?? '9999-99-99';
        bv = b.next_review_date ?? '9999-99-99';
      }
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="ml-1 text-[10px]">
      {sortKey === k ? (sortAsc ? '▲' : '▼') : '⇅'}
    </span>
  );

  return (
    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">
            FSRS Progress Table
          </h3>
          <p className="text-neutral-500 text-xs mt-0.5">
            {data.length} bài đang theo dõi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm bài..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/[0.05] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-blue-500/60 w-36"
          />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-white/[0.05] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-blue-500/60 cursor-pointer"
            style={{ backgroundColor: '#1e2535' }}
          >
            <option value="all" style={{ backgroundColor: '#1e2535' }}>
              Tất cả
            </option>
            <option value="new" style={{ backgroundColor: '#1e2535' }}>
              New
            </option>
            <option value="learning" style={{ backgroundColor: '#1e2535' }}>
              Learning
            </option>
            <option value="review" style={{ backgroundColor: '#1e2535' }}>
              Review
            </option>
            <option value="relearning" style={{ backgroundColor: '#1e2535' }}>
              Relearning
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {(
                [
                  ['title', 'Bài tập'],
                  ['state', 'Trạng thái'],
                  ['reps', 'Reps'],
                  ['stability', 'Stability'],
                  ['next_review_date', 'Ôn tiếp'],
                ] as [SortKey, string][]
              ).map(([k, label]) => (
                <th
                  key={k}
                  onClick={() => handleSort(k)}
                  className="text-left py-2 px-3 text-neutral-500 font-medium cursor-pointer hover:text-neutral-300 transition-colors select-none"
                >
                  {label}
                  <SortIcon k={k} />
                </th>
              ))}
              <th className="text-left py-2 px-3 text-neutral-500 font-medium">
                Rating
              </th>
              <th className="text-left py-2 px-3 text-neutral-500 font-medium">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-neutral-500">
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            ) : (
              sorted.map((item) => {
                const stateConf = STATE_CONFIG[item.state] ?? STATE_CONFIG.new;
                const ratingConf = item.last_rating
                  ? RATING_CONFIG[item.last_rating]
                  : null;
                const nextDate = item.next_review_date
                  ? new Date(item.next_review_date)
                  : null;
                const isOverdue = nextDate && nextDate < new Date();
                return (
                  <tr
                    key={item.card_id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex flex-col">
                        <span className="text-white font-medium truncate max-w-[180px]">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] ${DIFF_COLORS[item.difficulty_level] ?? 'text-neutral-500'}`}
                        >
                          {item.difficulty_level}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${stateConf.bg} ${stateConf.color}`}
                      >
                        {stateConf.label}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">
                      {item.reps}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-300 tabular-nums">
                      {item.stability !== null
                        ? item.stability.toFixed(1)
                        : '—'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={
                          isOverdue
                            ? 'text-red-400 font-medium'
                            : 'text-neutral-300'
                        }
                      >
                        {formatDate(item.next_review_date)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {ratingConf ? (
                        <span className={ratingConf.color}>
                          {ratingConf.label}
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          >
                            {t}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-neutral-600 text-[9px]">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
