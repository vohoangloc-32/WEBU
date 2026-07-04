import { useState, useEffect, useCallback } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { ProblemFilter } from '@/components/problem/ProblemFilter';
import { ProblemTable } from '@/components/problem/ProblemTable';
import { Pagination } from '@/components/notebook/Pagination';
import { ProblemItem } from '@/components/problem/problemMockData';
import apiClient from '@/api/apiClient';
import { problemApi } from '@/api/problemService';

interface BackendCard {
  _id: string;
  title: string;
  content?: {
    description?: string;
  };
  tags?: string[];
  course?: string;
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
  const [metaTags, setMetaTags] = useState<string[]>([]);
  const [metaGroups, setMetaGroups] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
      };
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedTags.length > 0) params.tags = selectedTags.join(',');
      if (selectedCourses.length > 0) params.group = selectedCourses[0];

      const response = await apiClient.get('/cards', { params });
      const data = response.data;

      const formattedData: ProblemItem[] = data.data.map(
        (item: BackendCard, index: number) => ({
          id: (currentPage - 1) * ITEMS_PER_PAGE + index + 1,
          dbId: item._id,
          name: item.title,
          tags: item.tags || [],
          group: item.group || item.course || '',
          difficulty: item.difficulty_level || 'Medium',
        }),
      );

      setProblems(formattedData);
      setMeta(data.meta || { total_items: 0, current_page: 1, total_pages: 1 });
    } catch (error) {
      console.error('Error while fetching data from the database:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, selectedTags, selectedCourses]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const metaOptions = await problemApi.getMetaOptions();
        setMetaTags(metaOptions.tags);
        setMetaGroups(metaOptions.courses);
      } catch (error) {
        console.error('Error while fetching meta options:', error);
      }
    };
    void fetchMeta();
  }, []);

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
            tagOptions={metaTags}
            courseOptions={metaGroups}
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
