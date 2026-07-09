import { useNavigate } from 'react-router-dom';
import { ProblemItem } from '@/components/problem/problemMockData';

interface ProblemTableProps {
  problems: ProblemItem[];
}

export const ProblemTable = ({ problems }: ProblemTableProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Hard') return 'bg-danger-a0 text-white';
    if (diff === 'Medium') return 'bg-warning-a20 text-tonal-a0';
    return 'bg-success-a0 text-tonal-a0';
  };

  const getProblemSlug = (name: string) => {
    return name
      .replace(/^#\d+\.\s*/, '') // Remove "#1. " prefix
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special chars with hyphens
      .replace(/^-+|-+$/g, ''); // Trim hyphens from ends
  };

  return (
    <div className="w-full flex flex-col border border-tonal-a30 rounded-lg overflow-hidden mt-4">
      {/* Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-tonal-a20 border-b border-tonal-a30">
        <div className="py-4 text-center text-white h6">Name</div>
        <div className="hidden sm:block py-4 text-center text-white h6">
          Tag
        </div>
        <div className="hidden lg:block py-4 text-center text-white h6">
          Group
        </div>
        <div className="py-4 text-center text-white h6">Difficulty</div>
      </div>

      {/* Body */}
      {problems.length > 0 ? (
        problems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => navigate(`/problems/${getProblemSlug(item.name)}`)}
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center py-4 cursor-pointer hover:bg-tonal-a20/40 transition-colors ${index !== problems.length - 1 ? 'border-b border-tonal-a30' : ''}`}
          >
            <div className="text-center text-neutral-a50 p7 font-bold px-2 truncate">
              {item.name}
            </div>

            <div className="hidden sm:flex justify-center flex-wrap gap-1 sm:gap-2 px-2">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary-a50 text-tonal-a0 px-2 sm:px-4 py-1 rounded-[100px] p8 font-bold text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="hidden lg:flex justify-center">
              <span className="bg-tonal-a30 text-white px-4 sm:px-6 py-2 rounded-[100px] p8 font-bold text-center">
                {item.group}
              </span>
            </div>

            <div className="flex justify-center">
              <span
                className={`px-4 sm:px-6 py-1 rounded-[100px] p8 font-bold ${getDifficultyColor(item.difficulty)}`}
              >
                {item.difficulty}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center text-neutral-a50 p7">
          No exercises were found that match your filters.
        </div>
      )}
    </div>
  );
};
