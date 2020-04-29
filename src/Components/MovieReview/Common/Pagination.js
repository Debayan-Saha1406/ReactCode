import React from "react";

const Pagination = (props) => {
  let pages = [];
  const {
    totalCount,
    pageSize,
    pageNumberClicked,
    currentPage,
    changeCount,
    description,
  } = props;
  let numberOfPages = totalCount / pageSize;
  numberOfPages = Math.ceil(numberOfPages);

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  return (
    <div className="topbar-filter">
      <label className="filterBy">{description} per page:</label>
      <select onChange={(e) => changeCount(e)}>
        <option value={pageSize}>
          {pageSize} {description}
        </option>
        <option value={10}>10 {description}</option>
      </select>
      <div className="pagination2">
        <span>
          Page {currentPage} of {pages}:
        </span>
        <ul className="menu">
          {/* {pages.map((page, index) => 
            <li
              key={index}
              onClick={() => pageNumberClicked(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </li>
          ))} */}
          {pages.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {currentPage === index + 1 ? (
                  <li
                    className="active-page"
                    key={index}
                    onClick={() => pageNumberClicked(page)}
                    style={{ cursor: "pointer" }}
                  >
                    {page}
                  </li>
                ) : (
                  <li
                    key={index}
                    onClick={() => pageNumberClicked(page)}
                    style={{ cursor: "pointer" }}
                  >
                    {page}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
