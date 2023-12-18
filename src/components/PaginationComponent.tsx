import React from 'react';
import { Pagination } from 'react-bootstrap';
import { PaginationComponentProps } from '../models/pagination';


const PaginationComponent: React.FC<PaginationComponentProps> = ({
  params,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  totalPages,
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
    const displayRange = Math.min(5, totalPages || 0); // Adjust the range as needed

    if (totalPages ?? 0 <= displayRange) {
      // If total pages are less than or equal to the display range, show all pages
    for (let page = 1; page <= (totalPages ?? 0); page++) {
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
      // If total pages exceed the display range, show ellipsis for middle pages
    const rangeStart = Math.max(1, Math.min(activePage ?? 1 - 2, (totalPages ?? 0) - displayRange + 1));
    const rangeEnd = Math.min(rangeStart + displayRange - 1, totalPages ?? 0);

      if (rangeStart > 1) {
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

    if (rangeEnd < (totalPages ?? 0)) {
        pageItems.push(
          <Pagination.Ellipsis key="ellipsis_end" disabled={hideDisabled} />
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
        onClick={() => handlePageSelect(activePage ?? 0 - 1)}
        disabled={activePage === 1 || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      {renderPageItems()}
      <Pagination.Next
        onClick={() => handlePageSelect(activePage ?? 0 + 1)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
      <Pagination.Last
        onClick={() => handlePageSelect(totalPages || 0)}
        disabled={activePage === totalPages || hideDisabled}
        hidden={totalPages === 1 || hideNavigation}
      />
    </Pagination>
  );
};

export default PaginationComponent;
