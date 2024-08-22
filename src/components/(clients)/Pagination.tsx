import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
