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
    <div className="topbar-filter" id="footer-pagination">
      <label className="filterBy">{description} per page:</label>
      <select onChange={(e) => changeCount(e)} className="dropdown-padding">
        {props.countList.map((count) => (
          <option value={count.id}>
            {count.value} {description}
          </option>
        ))}
      </select>
      <div className="pagination2">
        <span>
          Page {currentPage} of {numberOfPages}:
        </span>
        <ul className="menu">
          {pages.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {currentPage === index + 1 ? (
                  <li
                    className="active-page"
                    key={index}
                    onClick={() => pageNumberClicked(page)}
                    style={{ cursor: "pointer", paddingRight: "5px" }}
                  >
                    {page}
                  </li>
                ) : (
                  <li
                    key={index}
                    className="non-active-page"
                    onClick={() => pageNumberClicked(page)}
                    style={{ cursor: "pointer", paddingRight: "5px" }}
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
