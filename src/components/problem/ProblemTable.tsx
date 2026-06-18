import React from 'react';
import { ProblemItem } from '@/components/problem/problemMockData';

interface ProblemTableProps {
  problems: ProblemItem[];
}

export const ProblemTable = ({ problems }: ProblemTableProps) => {
  const getDifficultyColor = (diff: string) => {
    if (diff === 'Hard') return 'bg-danger-a0 text-white';
    if (diff === 'Medium') return 'bg-warning-a20 text-tonal-a0';
    return 'bg-success-a0 text-tonal-a0';
  };

  return (
    <div className="w-full flex flex-col border border-tonal-a30 rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="grid grid-cols-4 bg-tonal-a20 border-b border-tonal-a30">
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Name
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Tag
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Group
        </div>
        <div className="py-4 text-center font-bold text-white text-[20px]">
          Difficulty
        </div>
      </div>

      {/* Body */}
      {problems.length > 0 ? (
        problems.map((item, index) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 items-center py-4 ${index !== problems.length - 1 ? 'border-b border-tonal-a30' : ''}`}
          >
            <div className="text-center text-[#F2F2F2] font-semibold text-[18px]">
              {item.name}
            </div>

            <div className="flex justify-center flex-wrap gap-2 px-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#8CB6FF] text-black px-4 py-1 rounded-[100px] text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-center">
              <span className="bg-[#4D5B7C] text-white px-6 py-2 rounded-[100px] text-sm font-semibold">
                {item.group}
              </span>
            </div>

            <div className="flex justify-center">
              <span
                className={`px-6 py-1 rounded-[100px] text-sm font-bold ${getDifficultyColor(item.difficulty)}`}
              >
                {item.difficulty}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center text-neutral-a50 text-lg">
          No exercises were found that match your filters.
        </div>
      )}
    </div>
  );
};
