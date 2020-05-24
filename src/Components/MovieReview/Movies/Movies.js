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

class Movies extends Component {
  state = {
    readMoreOpacity: 0,
    showGrid: false,
    pageNumber: 1,
    pageSize: 10,
    searchQuery: "",
    moviesList: [],
    totalMovies: 0,
    movieIdClicked: 0,
    movieName: "",
    sortColumn: "Id",
    sortDirection: "asc",
    searchData: {
      movieName: "",
      rating: 0,
      fromYear: 0,
      toYear: 0,
      languageId: 0,
      searchType: null,
    },
    pageType: pageType.list,
  };

  componentDidMount() {
    this.fetchInitialData(0);
  }

  fetchInitialData = (screenOpacity) => {
    this.props.toggleLoader(true, screenOpacity);
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      if (response.status === 200) {
        this.setState(
          {
            moviesList: response.data.data.details,
            totalMovies: response.data.data.totalCount,
          },
          () => {
            this.props.toggleLoader(false, 1);
          }
        );
      }
    });
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
    this.setState({ pageSize: e.target.value });
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: e.target.value,
      searchQuery: "", //Needs to be changed once more movies are added
    };
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      this.setState({
        moviesList: response.data.data.details,
        totalMovies: response.data.data.totalCount,
      });
    });
  };

  pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: this.state.pageSize,
      searchQuery: "", //Needs to be changed once more movies are added
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        moviesList: response.data.data.details,
        totalMovies: response.data.data.totalCount,
        pageNumber: page,
      });
    });
  };

  getFilteredMovies = (
    e,
    movieName,
    selectedRating,
    fromYear,
    toYear,
    languageId
  ) => {
    e.preventDefault();
    let searchType = setSearchType(
      movieName,
      selectedRating,
      fromYear,
      toYear,
      languageId
    );

    this.setSearchDataInState(
      movieName,
      selectedRating,
      languageId,
      fromYear,
      toYear,
      searchType
    );
  };

  fetchSortedData = (e) => {
    const state = { ...this.state };
    if (e.target.value == 1) {
      state.sortColumn = sortColumns.movieName;
      state.sortDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      state.sortColumn = sortColumns.movieName;
      state.sortDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      state.sortColumn = sortColumns.rating;
      state.sortDirection = sortDirection.asc;
    } else {
      state.sortColumn = sortColumns.rating;
      state.sortDirection = sortDirection.desc;
    }

    this.setState(state, () => {
      this.fetchApiData();
    });
  };

  setSearchDataInState(
    movieName,
    selectedRating,
    languageId,
    fromYear,
    toYear,
    searchType
  ) {
    const searchData = { ...this.state.searchData };
    searchData.movieName = movieName ? movieName : null;
    searchData.rating = selectedRating;
    searchData.languageId = languageId;
    searchData.fromYear = fromYear != 0 ? fromYear : null;
    searchData.toYear = toYear != 0 ? toYear : null;
    searchData.searchType = searchType;
    this.setState({ searchData }, () => {
      this.fetchApiData();
    });
  }

  fetchApiData() {
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.rating,
      fromYear: this.state.searchData.fromYear,
      toYear: this.state.searchData.toYear,
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.props.toggleLoader(true, "15%");
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      this.setState(
        {
          moviesList: response.data.data.details,
          totalMovies: response.data.data.totalCount,
        },
        () => {
          this.props.toggleLoader(false, 1);
        }
      );
    });
  }

  toggleReadMoreOpacity = (opacity) => {
    this.setState({ readMoreOpacity: opacity });
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
                  ></Topbar>
                  {!this.state.showGrid && (
                    <List moviesList={this.state.moviesList}></List>
                  )}
                  {this.state.showGrid && (
                    <Grid
                      moviesList={this.state.moviesList}
                      toggleReadMoreOpacity={this.toggleReadMoreOpacity}
                      readMoreOpacity={this.state.readMoreOpacity}
                    ></Grid>
                  )}

                  {this.state.moviesList.length > 0 && (
                    <Pagination
                      pageSize={this.state.pageSize}
                      totalCount={this.state.totalMovies}
                      currentPage={this.state.pageNumber}
                      changeCount={this.changeMovieCount}
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
                  getFilteredMovies={this.getFilteredMovies}
                  languageLabel="Language"
                  reviewLabel="Review Count"
                  fetchInitialData={this.fetchInitialData}
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
