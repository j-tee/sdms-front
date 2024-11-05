import React from 'react';
import { Pagination } from 'react-bootstrap';
import { PaginationComponentProps } from '../models/pagination';

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  activePage = 1,  // Default to 1 if activePage is undefined
  itemsCountPerPage,
  totalItemsCount,
  totalPages = 0,  // Default to 0 if totalPages is undefined
  hideDisabled = false,
  hideNavigation = false,
  onChange,
}) => {
  const handlePageSelect = (page: number) => {
    if (onChange) {
      onChange(page);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    const displayRange = Math.min(5, totalPages);

    if (totalPages <= displayRange) {
      // Show all pages if the total number is less than or equal to the display range
      for (let page = 1; page <= totalPages; page++) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === activePage}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
    } else {
      // Handle ellipsis for larger page ranges
      const rangeStart = Math.max(1, Math.min(activePage - 2, totalPages - displayRange + 1));
      const rangeEnd = Math.min(rangeStart + displayRange - 1, totalPages);

      if (rangeStart > 1) {
        pageItems.push(
          <Pagination.Item
            key={1}
            onClick={() => handlePageSelect(1)}
          >
            1
          </Pagination.Item>
        );
        pageItems.push(
          <Pagination.Ellipsis key="ellipsis_start" disabled={hideDisabled} />
        );
      }

      for (let page = rangeStart; page <= rangeEnd; page++) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === activePage}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </Pagination.Item>
        );
      }

      if (rangeEnd < totalPages) {
        pageItems.push(
          <Pagination.Ellipsis key="ellipsis_end" disabled={hideDisabled} />
        );
        pageItems.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePageSelect(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return pageItems;
  };

  return (
    <Pagination className="d-flex justify-content-between align-items-center border border-primary border-1 p-2 ms-2 rounded pagination">
      <Pagination.First
        onClick={() => handlePageSelect(1)}
        disabled={activePage === 1 || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      <Pagination.Prev
        onClick={() => handlePageSelect(activePage - 1)}
        disabled={activePage === 1 || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      {renderPageItems()}
      <Pagination.Next
        onClick={() => handlePageSelect(activePage + 1)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      <Pagination.Last
        onClick={() => handlePageSelect(totalPages)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
    </Pagination>
  );
};

export default PaginationComponent;
