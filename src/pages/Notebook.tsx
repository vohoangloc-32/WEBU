import { useState, useEffect, useMemo } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { NotebookHeader } from '@/components/notebook/NotebookHeader';
import { NotebookFilter } from '@/components/notebook/NotebookFilter';
import { NotebookProblem } from '@/components/notebook/NotebookProblem';
import { Pagination } from '@/components/notebook/Pagination';
import { ProblemType } from '@/components/notebook/MockData';
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
  difficulty_level?: 'Easy' | 'Medium' | 'Hard';
}

export const Notebook = (): JSX.Element => {
  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [metaTags, setMetaTags] = useState<string[]>([]);
  const [metaGroups, setMetaGroups] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMetaAndNotebooks = async () => {
      try {
        const meta = await problemApi.getMetaOptions();
        setMetaTags(meta.tags);
        setMetaGroups(meta.courses);

        // Pass limit=200 to fetch all problems at once for client-side filtering/pagination
        // The default limit=10 was causing only 10 of 113 problems to be shown
        const response = await apiClient.get('/cards', {
          params: { limit: 200, page: 1 },
        });
        const data = response.data;

        const formattedData = data.data.map(
          (item: BackendCard, index: number) => ({
            id: String(index + 1),
            dbId: item._id,
            title: item.title,
            description: item.content?.description || '',
            tags: item.tags || [],
            group: item.course || '',
            difficulty: item.difficulty_level || 'Medium',
            isFavorite: false,
          }),
        );

        setProblems(formattedData);
      } catch (error) {
        console.error('Error while fetching data from the database:', error);
      }
    };

    fetchMetaAndNotebooks();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);

  const handleToggleFavorite = (id: string) => {
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === id
          ? { ...problem, isFavorite: !problem.isFavorite }
          : problem,
      ),
    );
  };

  const processedProblems = useMemo(() => {
    const result = problems.filter((problem) => {
      const matchSearch = problem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => problem.tags.includes(tag));
      const matchCourses =
        selectedCourses.length === 0 || selectedCourses.includes(problem.group);
      return matchSearch && matchTags && matchCourses;
    });
    result.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    return result;
  }, [problems, searchQuery, selectedTags, selectedCourses]);

  const totalPages = Math.ceil(processedProblems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = processedProblems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col items-center overflow-hidden select-none gap-10 pb-20">
        <div className="w-full max-w-300 flex flex-col gap-10 mt-5">
          <NotebookHeader />

          <NotebookFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
            tagOptions={metaTags}
            courseOptions={metaGroups}
          />

          {currentProblems.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-20">
              {currentProblems.map((problem) => (
                <NotebookProblem
                  key={problem.id}
                  id={problem.id}
                  dbId={problem.dbId}
                  title={problem.title}
                  description={problem.description}
                  tags={problem.tags}
                  group={problem.group}
                  difficulty={problem.difficulty}
                  isFavorite={problem.isFavorite}
                  onToggleFavorite={() => handleToggleFavorite(problem.id)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-20 text-neutral-a50 p6">
              No exercises were found that match your filters.
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notebook;
