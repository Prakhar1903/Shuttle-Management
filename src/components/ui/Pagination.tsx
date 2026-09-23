import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

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
          <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </span>
        );
      }
      return (
        <button
          key={`page-${page}`}
          type="button"
          onClick={() => onPageChange(page as number)}
          className={`min-w-[32px] h-8 px-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
            currentPage === page
              ? 'bg-[#183a7b] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {page}
        </button>
      );
    });
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 bg-slate-50/50 border-t border-slate-200/80">
      {/* Item Range */}
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-semibold text-slate-800">{start}</span> to{' '}
        <span className="font-semibold text-slate-800">{end}</span> of{' '}
        <span className="font-semibold text-slate-800">{totalItems}</span> items
      </p>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 px-2.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors border border-slate-200/80 bg-white shadow-2xs flex items-center gap-1"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1 px-1">
          {renderPageNumbers()}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 px-2.5 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors border border-slate-200/80 bg-white shadow-2xs flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
