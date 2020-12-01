import React, { Component } from "react";
import { sortColumns, sortDirection, apiUrl } from "./../../Shared/Constants";
import Pagination from "./Common/Pagination";
import SearchBar from "./Common/SearchBar";
import { Link } from "react-router-dom";
import LoaderProvider from "./../../Provider/LoaderProvider";
import { ToastContainer } from "react-toastify";
import { toggleLoader } from "./../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import ServiceProvider from "./../../Provider/ServiceProvider";

const requestParams = {
  sortColumn: sortColumns.directorName,
  sortDirection: sortDirection.asc,
};

class ViewMovies extends Component {
  state = {
    movies: [],
    isDropdownOpen: false,
    indexClicked: -1,
    showPopup: false,
    currentPage: 1,
    moviesPerPage: 5,
    totalMoviesCount: 0,
    isFilteredDataPresent: true,
    movieName: "",
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    this.fetchMoviesData();
  }

  previousPageClick = () => {
    this.setState(
      {
        currentPage: this.state.currentPage - 1,
        isDropdownOpen: false,
      },
      () => {
        this.props.toggleLoader(true, 0);
        this.fetchMoviesData();
      }
    );
  };

  nextPageClick = () => {
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
        isDropdownOpen: false,
      },
      () => {
        this.props.toggleLoader(true, 0);
        this.fetchMoviesData();
      }
    );
  };

  handleSearchIcon = (searchData) => {
    this.setState(
      {
        directorName: searchData,
      },
      () => {
        this.props.toggleLoader(true, 0);
        this.fetchMoviesData();
      }
    );
  };

  handlePageNumberClick = (currentPage) => {
    this.setState({ currentPage: currentPage, isDropdownOpen: false }, () => {
      this.props.toggleLoader(true, 0);
      this.fetchMoviesData();
    });
  };

  handleThreeDotMenu = (index) => {
    this.setState({
      indexClicked: index,
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  fetchMoviesData() {
    const body = {
      pageNumber: this.state.currentPage,
      pageSize: this.state.moviesPerPage,
      directorName: this.state.movieName,
      sortColumn: requestParams.sortColumn,
      sortDirection: requestParams.sortDirection,
    };
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      if (response.status === 200) {
        this.setState({
          movies: response.data.data.details,
          totalMoviesCount: response.data.data.totalCount,
        });
        this.props.toggleLoader(false, 1);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="user-data m-b-40">
          <div className="title-3 m-b-30">
            <i className="fa fa-user" aria-hidden="true"></i>
            {"  "}Movie Data
            <SearchBar handleSearchIcon={this.handleSearchIcon}></SearchBar>
            {this.state.totalMoviesCount > 0 && (
              <div className="pagination">
                <Pagination
                  totalCount={this.state.totalMoviesCount}
                  pageNumberClicked={this.handlePageNumberClick}
                  currentPage={this.state.currentPage}
                  pageSize={this.state.moviesPerPage}
                  previousPageClicked={this.previousPageClick}
                  nextPageClicked={this.nextPageClick}
                ></Pagination>
              </div>
            )}
          </div>
          <div className="table-responsive table-data">
            <table className="table">
              <thead>
                <tr className="header">
                  <td>id</td>
                  <td>Movie Name</td>
                  <td>Release Date</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.length === 0 &&
                !this.state.isFilteredDataPresent ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{"No Record Found..."}</td>
                  </tr>
                ) : (
                  this.state.movies.map((movie, index) => (
                    <tr key={index}>
                      <td>{movie.movieId}</td>
                      <td>
                        <div className="table-data__info">
                          <h6>{movie.movieName}</h6>
                        </div>
                      </td>
                      <td>{movie.releaseDate}</td>
                      <td>
                        <div
                          className="dropdown"
                          style={{ color: "black", overflow: "inherit" }}
                        >
                          <i
                            className="fa fa-ellipsis-v"
                            onClick={() => this.handleThreeDotMenu(index)}
                            style={{ cursor: "pointer" }}
                          ></i>
                          {this.state.indexClicked === index &&
                          this.state.isDropdownOpen ? (
                            <div
                              className="dropdown-menu show"
                              id="dropdown"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <Link
                                className="dropdown-item"
                                to={`/movie-details/${movie.movieId}`}
                                style={{ cursor: "pointer" }}
                              >
                                View All Details
                              </Link>
                              <Link
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                to={`/admin/edit-movie/${movie.movieId}`}
                              >
                                Edit
                              </Link>
                            </div>
                          ) : (
                            <div
                              className="dropdown-menu"
                              id="dropdown"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {" "}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div id="loaderContainer">
            <div id="loader">
              {this.props.showLoader && (
                <LoaderProvider
                  visible={this.props.showLoader}
                ></LoaderProvider>
              )}
            </div>
          </div>
          {<ToastContainer autoClose={8000}></ToastContainer>}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMovies);
