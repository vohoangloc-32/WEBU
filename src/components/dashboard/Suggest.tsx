import React from 'react';
import { ExpandIcon } from '@/components/ui/ExpandIcon';
import { Problem } from '@/components/dashboard/Problem';

interface SuggestProps {
  onExpandClick?: () => void;
  onReviewClick?: () => void;
  title?: string;
}

export const Suggest = ({
  onExpandClick,
  onReviewClick,
  title = '',
}: SuggestProps): JSX.Element => {
  return (
    <div className="w-145 min-h-140 p-8 bg-tonal-a20 rounded-[10px] flex flex-col gap-8">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-secondary-a50 h2 m-0">{title}</h2>
        <div
          className="w-8 h-9 flex items-center justify-center cursor-pointer rounded-sm"
          onClick={onExpandClick}
        >
          <ExpandIcon />
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full">
        <Problem
          difficulty="Easy"
          tags={['Array', 'Hash Table']}
          title="Two Sum"
          onReviewClick={onReviewClick}
        />
        <Problem
          difficulty="Medium"
          tags={['Linked List', 'Two Pointers']}
          title="Add Two Numbers"
          onReviewClick={onReviewClick}
        />
        <Problem
          difficulty="Hard"
          tags={['Dynamic Programming', 'Graph']}
          title="Longest Palindromic Substring"
          onReviewClick={onReviewClick}
        />
      </div>
    </div>
  );
};

export default Suggest;
