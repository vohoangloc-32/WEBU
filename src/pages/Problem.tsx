import { useState, useEffect } from 'react';
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
  difficulty_level?: string;
}

export const Problem = (): JSX.Element => {
  const [dbProblems, setDbProblems] = useState<ProblemItem[]>([]);
  const [metaTags, setMetaTags] = useState<string[]>([]);
  const [metaGroups, setMetaGroups] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMetaAndProblems = async () => {
      try {
        const meta = await problemApi.getMetaOptions();
        setMetaTags(meta.tags);
        setMetaGroups(meta.courses);

        const response = await apiClient.get('/cards');
        const data = response.data;
        const formattedData = data.data.map(
          (item: BackendCard, index: number) => ({
            id: index + 1,
            dbId: item._id,
            name: item.title,
            tags: item.tags || [],
            group: item.course || '',
            difficulty: item.difficulty_level || 'Medium',
          }),
        );

        setDbProblems(formattedData);
      } catch (error) {
        console.error('Error while fetching data from the database:', error);
      }
    };

    fetchMetaAndProblems();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);

  const filteredProblems = dbProblems.filter((problem) => {
    const matchSearch = problem.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => problem.tags.includes(tag));
    const matchCourses =
      selectedCourses.length === 0 || selectedCourses.includes(problem.group);

    return matchSearch && matchTags && matchCourses;
  });

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = filteredProblems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div>
      <header className="self-stretch flex flex-row justify-start gap-10 sticky top-0 z-10">
        <MainNavigation />
      </header>

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-10 flex flex-col items-center overflow-hidden select-none">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          <h1 className="h1 text-neutral-a50 leading-normal">Problem</h1>

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

          <ProblemTable problems={currentProblems} />

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

export default Problem;
