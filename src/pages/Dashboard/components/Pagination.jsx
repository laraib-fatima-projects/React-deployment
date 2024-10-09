
import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  handlePageChange,
  handlePageSizeChange,
  totalEntries
}) => {
  return (
    <div className="pagination-controls">
      <div className="d-flex justify-content-between align-items-center py-2">
        <div className="d-flex align-items-center">
          Page Size: 
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <div className="ms-4 items-list">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
          </div>
        </div>

        <div className="pagination-buttons">
          <button 
            className="btn" 
            disabled={currentPage === 1} 
            onClick={() => handlePageChange(1)}
          >
            &laquo;&laquo;
          </button>
          <button 
            className="btn" 
            disabled={currentPage === 1} 
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lsaquo;
          </button>
          
          <span className="mx-3">{currentPage}</span>
          
          <button 
            className="btn" 
            disabled={currentPage === totalPages} 
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &rsaquo;
          </button>
          <button 
            className="btn" 
            disabled={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            &raquo;&raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
