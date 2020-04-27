import React from "react";

const Pagination = (props) => {
  let pages = [];
  const {
    totalCount,
    pageSize,
    pageNumberClicked,
    currentPage,
    changeReviewCount,
  } = props;
  let numberOfPages = totalCount / pageSize;
  numberOfPages = Math.ceil(numberOfPages);

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  return (
    <div className="topbar-filter">
      <label className="filterBy">Reviews per page:</label>
      <select onChange={(e) => changeReviewCount(e)}>
        <option value={pageSize}>{pageSize} Reviews</option>
        <option value={10}>10 Reviews</option>
      </select>
      <div className="pagination2">
        <span>
          Page {currentPage} of {pages}:
        </span>
        <ul className="menu">
          {pages.map((page, index) => (
            <li
              key={index}
              onClick={() => pageNumberClicked(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </li>
          ))}
        </ul>

        {/* <a className="active" href="#">
  1
</a>
<a href="#">2</a>
<a href="#">3</a>
<a href="#">4</a>
<a href="#">5</a>
<a href="#">6</a> */}
      </div>
    </div>
  );
};

export default Pagination;
