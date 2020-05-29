/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/movie-single.css";
import Header from "../Common/Header";
import ServiceProvider from "../../../Provider/ServiceProvider";
import {
  apiUrl,
  pageType,
  sortColumns,
  sortDirection,
  movieSortTypeList,
  movieCountList,
} from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "../../../Provider/LoaderProvider";
import Topbar from "../Common/Topbar";
import Searchbox from "../Common/Searchbox";
import { setSearchType } from "../../../Shared/Services/SearchBoxSearchTypeService";
import List from "./List";
import Grid from "./Grid";
import NoResultFound from "../Common/NoResultFound";
import { countList } from "./../../../Shared/Constants";

class Movies extends Component {
  state = {
    readMoreOpacity: 0,
    imageOpacity: 1,
    showGrid: false,
    pageNumber: 1,
    pageSize: 1,
    searchQuery: "",
    moviesList: [],
    totalMovies: 0,
    movieIdClicked: 0,
    movieName: "",
    sortColumn: "Id",
    sortDirection: "asc",
    searchData: {
      movieName: "",
      selectedRating: 0,
      fromYear: 0,
      toYear: 0,
      languageId: 0,
      searchType: "",
    },
    pageType: pageType.list,
    imageLoaded: false,
  };

  componentDidMount() {
    this.props.toggleLoader(true, 0);
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: this.state.searchData.fromYear,
      toYear: this.state.searchData.toYear,
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.fetchMovies(body, !this.state.imageLoaded);
  }

  setMovieDetails = (e) => {
    const searchData = { ...this.state.searchData };
    searchData[e.target.name] = e.target.value;
    this.setState({ searchData });
  };

  clearState = (e) => {
    e.preventDefault();
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: "",
      movieName: "",
      selectedRating: 0,
      fromYear: 0,
      toYear: 0,
      languageId: 0,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.fetchMovies(body);
  };

  setPageType = (moviePageType) => {
    if (moviePageType === pageType.list) {
      this.setState({
        showGrid: false,
        pageType: pageType.list,
      });
    } else {
      this.setState({
        showGrid: true,
        pageType: pageType.grid,
      });
    }
  };

  changeMovieCount = (e) => {
    this.props.toggleLoader(true, "15%");
    const body = {
      pageNumber: 1,
      pageSize: e.target.value,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: this.state.searchData.fromYear,
      toYear: this.state.searchData.toYear,
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.props.toggleLoader(true, "15%");
    this.fetchMovies(body, !this.state.imageLoaded);
  };

  pageNumberClicked = (page) => {
    this.props.toggleLoader(true, "15%");
    const body = {
      pageNumber: page,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: this.state.searchData.fromYear,
      toYear: this.state.searchData.toYear,
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.fetchMovies(body);
  };

  fetchSortedData = (e) => {
    this.props.toggleLoader(true, "15%");
    let { sortColumn, sortByDirection } = this.getSortingDetails(e);

    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: this.state.searchData.fromYear,
      toYear: this.state.searchData.toYear,
      languageId: this.state.searchData.languageId,
      sortColumn: sortColumn,
      sortDirection: sortByDirection,
    };
    this.fetchMovies(body);
  };

  handleSubmit = (e, movieDetails) => {
    e.preventDefault();
    this.props.toggleLoader(true, "15%");
    let searchType = setSearchType(
      movieDetails.movieName,
      movieDetails.selectedRating,
      movieDetails.fromYear,
      movieDetails.toYear,
      movieDetails.languageId
    );

    const body = {
      pageNumber: 1,
      pageSize: this.state.pageSize,
      searchType: searchType,
      movieName: movieDetails.movieName,
      selectedRating: movieDetails.selectedRating,
      fromYear: movieDetails.fromYear,
      toYear: movieDetails.toYear,
      languageId: movieDetails.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };

    this.fetchMovies(body);
  };

  getSortingDetails(e) {
    let sortColumn = "",
      sortByDirection = "";
    if (e.target.value == 1) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.asc;
    } else {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  }

  fetchMovies(body, hideLoader) {
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      if (response.status === 200) {
        const searchData = { ...this.state.searchData };
        searchData.movieName = body.movieName;
        searchData.selectedRating = body.selectedRating;
        searchData.languageId = body.languageId;
        searchData.searchType = body.searchType;
        searchData.fromYear = body.fromYear;
        searchData.toYear = body.toYear;
        if (hideLoader) {
          this.setState({
            isImageLoaded: true,
            moviesList: response.data.data.details,
            totalMovies: response.data.data.totalCount,
            pageSize: body.pageSize,
            pageNumber: body.pageNumber,
            sortColumn: body.sortColumn,
            sortDirection: body.sortDirection,
            searchData,
          });
        } else {
          this.setState(
            {
              moviesList: response.data.data.details,
              totalMovies: response.data.data.totalCount,
              pageSize: body.pageSize,
              pageNumber: body.pageNumber,
              sortColumn: body.sortColumn,
              sortDirection: body.sortDirection,
              searchData,
            },
            () => {
              this.props.toggleLoader(false, 1);
            }
          );
        }
      }
    });
  }

  toggleOpacity = (opacity) => {
    if (opacity === 1) {
      this.setState({ readMoreOpacity: opacity, imageOpacity: 0.2 });
    } else {
      this.setState({ readMoreOpacity: opacity, imageOpacity: 1 });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="loaderContainer">
          <div id="loader">
            {this.props.showLoader && (
              <LoaderProvider visible={this.props.showLoader}></LoaderProvider>
            )}
          </div>
        </div>

        <div
          className="background"
          style={{
            opacity: this.props.screenOpacity,
          }}
        >
          <Header></Header>
          <div className="page-single movie_list">
            <div className="container">
              <div className="row ipad-width2">
                <div className="col-md-8 col-sm-12 col-xs-12">
                  <Topbar
                    totalCount={this.state.totalMovies}
                    pageType={this.state.pageType}
                    fetchSortedData={this.fetchSortedData}
                    setPageType={this.setPageType}
                    sortBylist={movieSortTypeList}
                  ></Topbar>
                  {this.state.moviesList.length === 0 ? (
                    <NoResultFound></NoResultFound>
                  ) : (
                    <React.Fragment>
                      {!this.state.showGrid && (
                        <List
                          moviesList={this.state.moviesList}
                          isImageLoaded={this.state.isImageLoaded}
                        ></List>
                      )}
                      {this.state.showGrid && (
                        <Grid
                          moviesList={this.state.moviesList}
                          toggleOpacity={this.toggleOpacity}
                          readMoreOpacity={this.state.readMoreOpacity}
                          imageOpacity={this.state.imageOpacity}
                        ></Grid>
                      )}
                    </React.Fragment>
                  )}
                  {this.state.moviesList.length > 0 && (
                    <Pagination
                      pageSize={this.state.pageSize}
                      totalCount={this.state.totalMovies}
                      currentPage={this.state.pageNumber}
                      changeCount={this.changeMovieCount}
                      countList={countList}
                      pageNumberClicked={this.pageNumberClicked}
                      description="Movies"
                    ></Pagination>
                  )}
                </div>
                <Searchbox
                  title="Search For Movie"
                  movieNameLabel="Movie Name"
                  ratingLabel="Rating Range"
                  releaseYearLabel="Release Year"
                  handleSubmit={this.handleSubmit}
                  languageLabel="Language"
                  reviewLabel="Review Count"
                  fetchInitialData={this.fetchInitialData}
                  setMovieDetails={this.setMovieDetails}
                  movieDetails={this.state.searchData}
                  clearState={this.clearState}
                ></Searchbox>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
