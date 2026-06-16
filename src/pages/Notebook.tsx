import React, { useState, useEffect } from 'react';
import { MainNavigation } from '@/components/ui/MainNavigation';
import { NotebookHeader } from '@/components/notebook/NotebookHeader';
import { NotebookFilter } from '@/components/notebook/NotebookFilter';
import { NotebookProblem } from '@/components/notebook/NotebookProblem';
import { Pagination } from '@/components/notebook/Pagination';
import { mockProblems } from '@/components/notebook/MockData';

export const Notebook = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTags, selectedCourses]);
  const filteredProblems = mockProblems.filter((problem) => {
    const matchSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => problem.tags.includes(tag));
    const matchCourses =
      selectedCourses.length === 0 ||
      selectedCourses.every((course) => problem.tags.includes(course));
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

      <div className="w-full min-h-screen bg-tonal-a10 px-20 py-5 flex flex-col items-center overflow-hidden select-none gap-10 pb-20">
        <div className="w-full max-w-[1200px] flex flex-col gap-10 mt-5">
          <NotebookHeader />

          <NotebookFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
          />

          {currentProblems.length > 0 ? (
            <div className="w-full grid grid-cols-3 gap-[80px]">
              {currentProblems.map((problem) => (
                <NotebookProblem
                  key={problem.id}
                  id={problem.id}
                  title={problem.title}
                  description={problem.description}
                  tags={problem.tags}
                  difficulty={problem.difficulty}
                  isFavorite={problem.isFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center py-20 text-neutral-a50 text-xl">
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
