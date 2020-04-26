import React from "react";

const Pagination = (props) => {
  debugger;
  let pages = [];
  const { totalCount, pageSize, pageNumberClicked, currentPage } = props;
  let numberOfPages = totalCount / pageSize;
  numberOfPages = Math.ceil(numberOfPages);

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  return (
    <div class="topbar-filter">
      <label className="filterBy">Reviews per page:</label>
      <select>
        <option value="range">{props.pageSize} Reviews</option>
        <option value="saab">10 Reviews</option>
      </select>
      <div class="pagination2">
        <span>
          Page {currentPage} of {pages}:
        </span>
        <ul className="menu">
          {pages.map((page) => (
            <li>{page}</li>
          ))}
        </ul>

        {/* <a class="active" href="#">
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
