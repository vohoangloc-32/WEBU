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
  // Build list of page numbers to show, with -1 representing "..."
  const getPageRange = (): (number | -1)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | -1)[] = [];
    const showAround = 1; // how many pages around current to show

    const alwaysShow = new Set(
      [
        1,
        2,
        totalPages - 1,
        totalPages,
        currentPage - showAround,
        currentPage,
        currentPage + showAround,
      ].filter((p) => p >= 1 && p <= totalPages),
    );

    const sorted = Array.from(alwaysShow).sort((a, b) => a - b);

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        pages.push(-1); // ellipsis
      }
      pages.push(sorted[i]);
    }

    return pages;
  };

  const pageRange = getPageRange();

  const btnBase =
    'flex justify-center items-center w-[40px] h-[40px] rounded-[12px] cursor-pointer transition-colors text-sm font-bold select-none';
  const btnActive = 'bg-secondary-a70 text-white';
  const btnInactive = 'bg-tonal-a50 text-secondary-a10 hover:bg-tonal-a40';
  const btnDots = 'text-neutral-a50 cursor-default hover:bg-transparent';

  return (
    <div className="w-full flex justify-center items-center gap-[8px] mt-10 flex-wrap">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? 'opacity-30 cursor-not-allowed bg-tonal-a50 text-neutral-a50' : btnInactive}`}
      >
        ‹
      </button>

      {pageRange.map((page, idx) =>
        page === -1 ? (
          <div key={`dots-${idx}`} className={`${btnBase} ${btnDots}`}>
            …
          </div>
        ) : (
          <div
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${currentPage === page ? btnActive : btnInactive}`}
          >
            {page}
          </div>
        ),
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed bg-tonal-a50 text-neutral-a50' : btnInactive}`}
      >
        ›
      </button>
    </div>
  );
};
