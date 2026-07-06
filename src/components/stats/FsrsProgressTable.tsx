import React, { useState } from 'react';
import { FsrsProgressItem } from '../../api/statsService';

interface FsrsProgressTableProps {
  data: FsrsProgressItem[];
}

const STATE_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  new: { label: 'New', color: 'text-neutral-a300', bg: 'bg-surface-a30' },
  learning: {
    label: 'Learning',
    color: 'text-warning-a10',
    bg: 'bg-warning-a10/20',
  },
  review: {
    label: 'Review',
    color: 'text-success-a10',
    bg: 'bg-success-a10/20',
  },
  relearning: {
    label: 'Relearning',
    color: 'text-danger-a10',
    bg: 'bg-danger-a10/20',
  },
};

const RATING_CONFIG: Record<string, { label: string; color: string }> = {
  easy: { label: '😊 Easy', color: 'text-success-a10' },
  good: { label: '👍 Good', color: 'text-primary-a30' },
  hard: { label: '😰 Hard', color: 'text-warning-a10' },
  again: { label: '🔁 Again', color: 'text-danger-a10' },
};

const DIFF_COLORS: Record<string, string> = {
  Easy: 'text-success-a10',
  Medium: 'text-warning-a10',
  Hard: 'text-danger-a10',
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
    <div className="p-5 rounded-2xl bg-tonal-a20 border border-tonal-a30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-neutral-a50 font-semibold p7">
            FSRS Progress Table
          </h3>
          <p className="text-neutral-a300 p8 mt-0.5">
            {data.length} bài đang theo dõi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm bài..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-tonal-a30 border border-tonal-a40 rounded-lg px-3 py-1.5 p8 text-neutral-a50 placeholder-neutral-a400 outline-none focus:border-primary-a30 w-36"
          />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="bg-tonal-a30 border border-tonal-a40 rounded-lg px-2 py-1.5 p8 text-neutral-a50 outline-none focus:border-primary-a30 cursor-pointer"
          >
            <option value="all">Tất cả</option>
            <option value="new">New</option>
            <option value="learning">Learning</option>
            <option value="review">Review</option>
            <option value="relearning">Relearning</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-tonal-a30">
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
                  className="text-left py-2 px-3 text-neutral-a300 font-medium cursor-pointer hover:text-neutral-a100 transition-colors select-none"
                >
                  {label}
                  <SortIcon k={k} />
                </th>
              ))}
              <th className="text-left py-2 px-3 text-neutral-a300 font-medium">
                Rating
              </th>
              <th className="text-left py-2 px-3 text-neutral-a300 font-medium">
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-neutral-a400">
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
                    className="border-b border-tonal-a30 hover:bg-tonal-a30/50 transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="flex flex-col">
                        <span className="text-neutral-a50 font-medium truncate max-w-[180px]">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] ${DIFF_COLORS[item.difficulty_level] ?? 'text-neutral-a400'}`}
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
                    <td className="py-2.5 px-3 text-neutral-a100 tabular-nums">
                      {item.reps}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-a100 tabular-nums">
                      {item.stability !== null
                        ? item.stability.toFixed(1)
                        : '—'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={
                          isOverdue
                            ? 'text-danger-a10 font-medium'
                            : 'text-neutral-a100'
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
                        <span className="text-neutral-a400">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] bg-primary-a10/10 text-primary-a30 border border-primary-a10/30"
                          >
                            {t}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-neutral-a400 text-[9px]">
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
