import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageItem = (page: number) => {
    const isActive = currentPage === page;
    return (
      <div
        key={page}
        onClick={() => onPageChange(page)}
        className={`flex justify-center items-center w-[50px] h-[50px] p-[10px] rounded-[20px] cursor-pointer transition-colors ${
          isActive
            ? 'bg-secondary-a70 text-white'
            : 'bg-tonal-a50 text-secondary-a10 hover:bg-tonal-a40'
        }`}
      >
        <span className="h6">{page}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center gap-[10px] mt-10">
      {[...Array(totalPages)].map((_, index) => renderPageItem(index + 1))}
    </div>
  );
};
