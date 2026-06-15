import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainNavigation } from '@/components/ui/MainNavigation';

interface ProblemItem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  acceptance: string;
  status: 'Solved' | 'Attempted' | 'Todo';
}

const PROBLEMS_DATA: ProblemItem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    acceptance: '51.2%',
    status: 'Solved',
  },
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Math', 'Recursion'],
    acceptance: '42.8%',
    status: 'Attempted',
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Hard',
    tags: ['String', 'Dynamic Programming'],
    acceptance: '33.5%',
    status: 'Todo',
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['String', 'Stack'],
    acceptance: '41.0%',
    status: 'Todo',
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    tags: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)'],
    acceptance: '50.1%',
    status: 'Todo',
  },
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    acceptance: '54.5%',
    status: 'Solved',
  },
];

export const Problem = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Filter logic
  const filteredProblems = PROBLEMS_DATA.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty =
      selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyBadge = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return (
          <span className="h-6 px-3 py-1 bg-success-a0/20 text-success-a0 text-sm font-semibold rounded-sm">
            Easy
          </span>
        );
      case 'Medium':
        return (
          <span className="h-6 px-3 py-1 bg-warning-a0/20 text-warning-a0 text-sm font-semibold rounded-sm">
            Medium
          </span>
        );
      case 'Hard':
        return (
          <span className="h-6 px-3 py-1 bg-danger-a0/20 text-danger-a0 text-sm font-semibold rounded-sm">
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status: 'Solved' | 'Attempted' | 'Todo') => {
    switch (status) {
      case 'Solved':
        return (
          <svg
            className="w-5 h-5 text-success-a0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case 'Attempted':
        return (
          <svg
            className="w-5 h-5 text-warning-a0 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3"
            />
          </svg>
        );
      case 'Todo':
      default:
        return (
          <div className="w-5 h-5 rounded-full border border-neutral-a400/40" />
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-tonal-a0 flex flex-col justify-start items-stretch select-none">
      <header className="self-stretch sticky top-0 z-10">
        <MainNavigation />
      </header>

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-10 flex flex-col gap-8">
        {/* Page Title & Stats */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-tonal-a10 p-6 rounded-2xl border border-tonal-a20">
          <div>
            <h1 className="text-secondary-a30 h1 mb-2">Practice Problems</h1>
            <p className="text-neutral-a300 p7">
              Level up your coding skills by solving customized real-world
              problems.
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="text-center bg-tonal-a20 px-4 py-3 rounded-lg min-w-24">
              <div className="text-success-a0 font-bold h5">2</div>
              <div className="text-neutral-a400 p8">Solved</div>
            </div>
            <div className="text-center bg-tonal-a20 px-4 py-3 rounded-lg min-w-24">
              <div className="text-warning-a0 font-bold h5">1</div>
              <div className="text-neutral-a400 p8">Attempting</div>
            </div>
            <div className="text-center bg-tonal-a20 px-4 py-3 rounded-lg min-w-24">
              <div className="text-secondary-a50 font-bold h5">3</div>
              <div className="text-neutral-a400 p8">Todo</div>
            </div>
          </div>
        </section>

        {/* Filter Toolbar */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Difficulty Filters */}
          <div className="flex gap-2 bg-tonal-a10 p-1.5 rounded-lg border border-tonal-a20 w-fit">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                  selectedDifficulty === diff
                    ? 'bg-secondary-a90 text-white shadow-md'
                    : 'text-neutral-a300 hover:text-white hover:bg-tonal-a20'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search problem title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-tonal-a10 text-white placeholder-neutral-a400 border border-tonal-a20 rounded-lg py-2 pl-10 pr-4 focus:border-secondary-a70 transition-all text-sm"
            />
            <svg
              className="w-4 h-4 text-neutral-a400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </section>

        {/* Problems Grid List */}
        <section className="bg-tonal-a10 rounded-2xl border border-tonal-a20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-tonal-a20 bg-tonal-a20/50 text-neutral-a300 font-semibold p8">
                  <th className="py-4 px-6 w-12">Status</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Tags</th>
                  <th className="py-4 px-6 w-32">Difficulty</th>
                  <th className="py-4 px-6 w-32">Acceptance</th>
                  <th className="py-4 px-6 w-24 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((prob) => (
                    <tr
                      key={prob.id}
                      className="border-b border-tonal-a20 hover:bg-tonal-a20/35 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/problems/${prob.id}`)}
                    >
                      <td
                        className="py-4 px-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {getStatusIcon(prob.status)}
                      </td>
                      <td className="py-4 px-6 font-semibold text-white group-hover:text-secondary-a50 transition-colors">
                        {prob.title}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1.5">
                          {prob.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-tonal-a20 text-neutral-a300 text-xs rounded border border-tonal-a30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getDifficultyBadge(prob.difficulty)}
                      </td>
                      <td className="py-4 px-6 text-neutral-a300 font-medium">
                        {prob.acceptance}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          className="px-4 py-2 bg-secondary-a90 hover:bg-secondary-a70 text-white rounded text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                          Code
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 px-6 text-center text-neutral-a400 p7"
                    >
                      No problems match your search criteria. Try a different
                      query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Problem;
