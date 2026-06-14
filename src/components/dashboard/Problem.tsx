import React from 'react';

interface ProblemProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
  title?: string;
  onReviewClick?: () => void;
}

export const Problem = ({
  difficulty = 'Easy',
  tags = [],
  title = '',
  onReviewClick,
}: ProblemProps): JSX.Element => {
  return (
    <div className="w-full h-24 px-8 bg-surface-a20 rounded-[20px] flex justify-between items-center overflow-hidden">
      <div className="flex flex-col justify-center items-start gap-2.5">
        <div className="text-white p5">{title}</div>
        <div className="flex justify-start items-center gap-2.5">
          <div className="h-6 px-3 py-1 bg-teal-400/40 rounded-sm flex justify-center items-center">
            <span className="text-success-a0 p8">{difficulty}</span>
          </div>
          <div className="h-6 px-3 py-1 bg-clr-info-a0 rounded-sm flex justify-center items-center">
            <span className="text-info-a20 p8">{tags[0]}</span>
          </div>
          <div className="h-6 px-3 py-1 bg-clr-info-a0 rounded-sm flex justify-center items-center">
            <span className="text-info-a20 p8">{tags[1]}</span>
          </div>
        </div>
      </div>
      <div
        className="text-secondary-a90 p7 cursor-pointer"
        onClick={onReviewClick}
      >
        Review now &gt;
      </div>
    </div>
  );
};

export default Problem;
