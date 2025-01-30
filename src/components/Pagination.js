import React from 'react';

const Pagination = ({ pagination, onPrevPage, onNextPage, loading }) => {
  return (
    <div>
      <button onClick={onPrevPage} disabled={!pagination.prev || loading}>
        Previous
      </button>
      <button onClick={onNextPage} disabled={!pagination.next || loading}>
        Next
      </button>
    </div>
  );
};

export default Pagination;