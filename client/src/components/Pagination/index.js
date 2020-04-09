import React from "react";
import ReactPaginate from "react-paginate";

import "./style.scss";

const Pagination = ({ handlePageChange, pageCount = 10, selectedPage = 0 }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      forcePage={selectedPage}
      containerClassName="pagination"
      previousLabel=""
      nextLabel=""
      pageLinkClassName="page-link"
      activeLinkClassName="page-link page-link--active"
      previousClassName="arrow arrow--left"
      nextClassName="arrow arrow--right"
      disabledClassName="arrow--disabled"
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
