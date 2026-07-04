import { useState, useEffect, useCallback } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ProblemFilter } from '@/components/problem/ProblemFilter';
import { ProblemTable } from '@/components/problem/ProblemTable';
import { Pagination } from '@/components/notebook/Pagination';
import { ProblemItem } from '@/components/problem/problemMockData';

interface BackendCard {
  _id: string;
  title: string;
  content?: {
    description?: string;
  };
  tags?: string[];
  group?: string;
  difficulty_level?: string;
}

interface BackendMeta {
  total_items: number;
  current_page: number;
  total_pages: number;
}

const ITEMS_PER_PAGE = 10;

export const Problem = (): JSX.Element => {
  const [problems, setProblems] = useState<ProblemItem[]>([]);
  const [meta, setMeta] = useState<BackendMeta>({
    total_items: 0,
    current_page: 1,
    total_pages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(ITEMS_PER_PAGE));
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
      if (selectedCourses.length > 0) params.set('group', selectedCourses[0]);

      const response = await fetch(
        `http://localhost:3000/cards?${params.toString()}`,
      );
      const data = await response.json();

      const formattedData: ProblemItem[] = data.data.map(
        (item: BackendCard, index: number) => ({
          id: (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
          dbId: item._id,
          name: item.title,
          tags: item.tags || [],
          group: item.group || '',
          difficulty: item.difficulty_level || 'Medium',
        }),
      );

      setProblems(formattedData);
      setMeta(data.meta);
    } catch (error) {
      console.error('Error while fetching data from the database:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, selectedTags, selectedCourses]);

  useEffect(() => {
    void fetchProblems();
  }, [fetchProblems]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-10 flex flex-col items-center overflow-hidden select-none">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          <div className="flex items-baseline gap-4">
            <h1 className="h1 text-neutral-a50 leading-normal">Problem</h1>
            {!isLoading && (
              <span className="text-neutral-a50 p7 opacity-60">
                {meta.total_items} bài tập
              </span>
            )}
          </div>

          <ProblemFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          {isLoading ? (
            <div className="w-full flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-secondary-a70 border-t-transparent rounded-full animate-spin" />
                <span className="text-neutral-a50 p7">Đang tải...</span>
              </div>
            </div>
          ) : (
            <ProblemTable problems={problems} />
          )}

          {meta.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={meta.total_pages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
