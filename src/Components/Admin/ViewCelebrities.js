/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import SearchBar from "./Common/SearchBar";
import Pagination from "./Common/Pagination";
import LoaderProvider from "../../Provider/LoaderProvider";
import { ToastContainer } from "react-toastify";
import ServiceProvider from "../../Provider/ServiceProvider";
import { apiUrl, sortDirection } from "../../Shared/Constants";
import { sortColumns } from "../../Shared/Constants";
import { toggleLoader } from "../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import { celebritySearchType } from "../../Shared/Constants";
import { Link } from "react-router-dom";

const requestParams = {
  celebrityInitial: 0,
  fromBirthYear: 0,
  gender: 0,

  sortColumn: sortColumns.celebrityName,
  sortDirection: sortDirection.asc,
  toBirthYear: 0,
};

class ViewCelebrities extends Component {
  state = {
    celebrities: [],
    isDropdownOpen: false,
    indexClicked: -1,
    showPopup: false,
    currentPage: 1,
    celebritiesPerPage: 5,
    totalCelebritiesCount: 0,
    isFilteredDataPresent: true,
    celebrityName: "",
    searchType: "",
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    this.fetchCelebsData();
  }

  previousPageClick = () => {
    this.setState(
      {
        currentPage: this.state.currentPage - 1,
        isDropdownOpen: false,
      },
      () => {
        this.props.toggleLoader(true, 0);
        this.fetchCelebsData();
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
        this.fetchCelebsData();
      }
    );
  };

  handleSearchIcon = (searchData) => {
    this.setState(
      {
        celebrityName: searchData,
        searchType: celebritySearchType.celebrityName,
      },
      () => {
        this.props.toggleLoader(true, 0);
        this.fetchCelebsData();
      }
    );
  };

  handlePageNumberClick = (currentPage) => {
    this.setState({ currentPage: currentPage, isDropdownOpen: false }, () => {
      this.props.toggleLoader(true, 0);
      this.fetchCelebsData();
    });
  };

  handleThreeDotMenu = (index) => {
    this.setState({
      indexClicked: index,
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  fetchCelebsData() {
    const body = {
      pageNumber: this.state.currentPage,
      pageSize: this.state.celebritiesPerPage,
      searchQuery: this.state.searchData,
      celebrityInitial: requestParams.celebrityInitial,
      celebrityName: this.state.celebrityName,
      fromBirthYear: requestParams.fromBirthYear,
      toBirthYear: requestParams.toBirthYear,
      gender: requestParams.gender,
      searchType: this.state.searchType,
      sortColumn: requestParams.sortColumn,
      sortDirection: requestParams.sortDirection,
    };
    ServiceProvider.post(apiUrl.celebrities, body).then((response) => {
      if (response.status === 200) {
        this.setState({
          celebrities: response.data.data.details,
          totalCelebritiesCount: response.data.data.totalCount,
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
            {"  "}Celeb Data
            <SearchBar handleSearchIcon={this.handleSearchIcon}></SearchBar>
            {this.state.totalCelebritiesCount > 0 && (
              <div className="pagination">
                <Pagination
                  totalCount={this.state.totalCelebritiesCount}
                  pageNumberClicked={this.handlePageNumberClick}
                  currentPage={this.state.currentPage}
                  pageSize={this.state.celebritiesPerPage}
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
                  <td>Celeb Name</td>
                  <td>Date Of Birth</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.celebrities.length === 0 &&
                !this.state.isFilteredDataPresent ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>{"No Record Found..."}</td>
                  </tr>
                ) : (
                  this.state.celebrities.map((celebrity, index) => (
                    <tr key={index}>
                      <td>{celebrity.id}</td>
                      <td>
                        <div className="table-data__info">
                          <h6>{celebrity.celebrityName}</h6>
                        </div>
                      </td>
                      <td>{celebrity.dateOfBirth}</td>
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
                                to={`/celebrity-details/${celebrity.id}`}
                                style={{ cursor: "pointer" }}
                              >
                                View All Details
                              </Link>
                              <Link
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                to={`/admin/edit-celeb/${celebrity.id}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewCelebrities);
