"use client";

import { useState } from "react";

export default function Pagination({ totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
          currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Previous page"
      >
        ←
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => handlePageChange(number + 1)}
          className={`px-4 py-2 text-sm font-medium ${
            currentPage === number + 1
              ? "text-white bg-red-600 border border-red-600"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          } rounded-md`}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
          currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
