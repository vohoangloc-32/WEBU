import React, { useState, useEffect } from 'react';
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

export const Problem = (): JSX.Element => {
  const [dbProblems, setDbProblems] = useState<ProblemItem[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cards');
        const data = await response.json();
        const formattedData = data.data.map(
          (item: BackendCard, index: number) => ({
            id: index + 1,
            dbId: item._id,
            name: item.title,
            tags: item.tags || [],
            group: item.group || '',
            difficulty: item.difficulty_level || 'Medium',
          }),
        );

        setDbProblems(formattedData);
      } catch (error) {
        console.error('Lỗi khi kéo data từ DB:', error);
      }
    };

    fetchProblems();
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
