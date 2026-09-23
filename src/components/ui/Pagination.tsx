import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

/**
 * Enterprise Table Pagination Footer
 * Responsive, aligned, and clean page control.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${index}`} className="px-1 text-slate-400 text-xs">
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${page}`}
          type="button"
          onClick={() => onPageChange(page as number)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center ${
            currentPage === page
              ? 'border border-[#1a73e8] text-[#1a73e8] bg-white shadow-2xs'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-1 text-xs select-none">
      {/* Item Range */}
      <span className="text-slate-500 font-normal">
        Showing {start}-{end} of {totalItems} items
      </span>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5">
        {renderPageNumbers()}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
