/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Pagination extends Component {
  state = {};

  render() {
    let pages = [];
    const {
      totalCount,
      pageSize,
      previousPageClicked,
      pageNumberClicked,
      nextPageClicked,
      currentPage,
    } = this.props;
    let numberOfPages = totalCount / pageSize;
    numberOfPages = Math.ceil(numberOfPages);

    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }

    return (
      <nav aria-label="...">
        <ul class="pagination" style={{ cursor: "pointer" }}>
          {this.props.currentPage === 1 ? (
            <li className="page-item disabled">
              <a className="page-link" tabIndex="-1">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a
                className="page-link"
                tabIndex="-1"
                onClick={previousPageClicked}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
          )}
          {pages.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {this.props.currentPage === index + 1 ? (
                  <li key={index} className="page-item active">
                    <a
                      className="page-link"
                      onClick={() => pageNumberClicked(index + 1)}
                    >
                      {page}
                    </a>
                  </li>
                ) : (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      onClick={() => pageNumberClicked(index + 1)}
                    >
                      {page}
                    </a>
                  </li>
                )}
              </React.Fragment>
            );
          })}
          {currentPage === numberOfPages ? (
            <li className="page-item disabled">
              <a className="page-link" tabIndex="-1">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a className="page-link" tabIndex="-1" onClick={nextPageClicked}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
