/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Pagination extends Component {
  state = {};

  componentDidMount() {
    debugger;
  }

  render() {
    let pages = [];
    let numberOfPages = this.props.totalUsers / this.props.usersPerPage;
    numberOfPages = Math.ceil(numberOfPages);

    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i);
    }
    return (
      <nav aria-label="...">
        <ul class="pagination">
          {this.props.currentPage === 1 ? (
            <li className="page-item disabled">
              <a className="page-link" tabIndex="-1">
                Previous
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a
                className="page-link"
                tabIndex="-1"
                onClick={this.props.previousPageClicked}
              >
                Previous
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
                      onClick={() => this.props.pageNumberClicked(index + 1)}
                    >
                      {page}
                    </a>
                  </li>
                ) : (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      onClick={() => this.props.pageNumberClicked(index + 1)}
                    >
                      {page}
                    </a>
                  </li>
                )}
              </React.Fragment>
            );
          })}
          {this.props.currentPage === numberOfPages ? (
            <li className="page-item disabled">
              <a className="page-link" tabIndex="-1">
                Next
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a
                className="page-link"
                tabIndex="-1"
                onClick={this.props.nextPageClicked}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
