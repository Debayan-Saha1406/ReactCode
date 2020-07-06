/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const BoxPagination = (props) => {
  let pages = [];
  const {
    totalCount,
    pageSize,
    pageNumberClicked,
    currentPage,
    nextArrowBtnClicked,
    prevArrowBtnClicked,
  } = props;
  let numberOfPages = totalCount / pageSize;
  numberOfPages = Math.ceil(numberOfPages);
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }
  return (
    <ul className="box-pagination">
      <li className="icon-prev">
        {currentPage !== 1 ? (
          <a className="arrow-btn">
            <i
              className="fa fa-arrow-left"
              aria-hidden="true"
              onClick={prevArrowBtnClicked}
            ></i>
          </a>
        ) : (
          <a className="disabled-arrow-btn">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </a>
        )}
      </li>
      {pages.map((page, index) => {
        return (
          <React.Fragment key={index}>
            {currentPage === index + 1 ? (
              <li
                className="active"
                key={index}
                onClick={() => pageNumberClicked(page)}
                style={{ cursor: "pointer", paddingRight: "5px" }}
              >
                <a>{page}</a>
              </li>
            ) : (
              <li
                key={index}
                onClick={() => pageNumberClicked(page)}
                style={{ cursor: "pointer", paddingRight: "5px" }}
              >
                <a>{page}</a>
              </li>
            )}
          </React.Fragment>
        );
      })}
      <li className="icon-next">
        {currentPage !== pages.length ? (
          <a className="arrow-btn">
            <i
              className="fa fa-arrow-right"
              aria-hidden="true"
              onClick={nextArrowBtnClicked}
            ></i>
          </a>
        ) : (
          <a className="disabled-arrow-btn">
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        )}
      </li>
    </ul>
  );
};

export default BoxPagination;
