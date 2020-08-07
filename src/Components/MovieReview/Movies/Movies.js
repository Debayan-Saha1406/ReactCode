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
  movieSearchType,
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
import Footer from "../Common/Footer";
import { page } from "./../../../Shared/Constants";
import image from "../../../images/movieList.jpg";
import { years } from "./../../../Shared/Constants";
import NetworkDetector from "../Common/NetworkDetector";
// import NetworkDetector from './../MovieHome/Home';
import { compose } from "redux";

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
    sortColumn: sortColumns.movieName,
    sortDirection: sortDirection.asc,
    searchData: {
      movieName: "",
      selectedRating: 0,
      fromYear: 0,
      toYear: 0,
      languageId: 0,
      searchType: "",
    },
    pageType: pageType.list,
    isImageLoading: false,
    movieIndexHovered: -1,
  };

  componentDidMount() {
    this.props.toggleLoader(true, 0);
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: Number(this.state.searchData.fromYear),
      toYear: Number(this.state.searchData.toYear),
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    if (this.props.location.isFromSlider) {
      const searchData = { ...this.state.searchData };
      searchData.fromYear = years[0];
      searchData.toYear = years[3];
      searchData.searchType = movieSearchType.releaseYear;
      this.setState({ searchData });
      body.fromYear = searchData.fromYear;
      body.toYear = searchData.toYear;
      body.searchType = searchData.searchType;
    }
    this.fetchMovies(body, true);
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
    let hideLoader = true;
    if (e.target.value > this.state.pageSize) {
      hideLoader = false;
    }
    const body = {
      pageNumber: 1,
      pageSize: e.target.value,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: Number(this.state.searchData.fromYear),
      toYear: Number(this.state.searchData.toYear),
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.props.toggleLoader(true, "15%");
    this.fetchMovies(body, hideLoader);
  };

  pageNumberClicked = (page) => {
    this.props.toggleLoader(true, "15%");
    const body = {
      pageNumber: page,
      pageSize: this.state.pageSize,
      searchType: this.state.searchData.searchType,
      movieName: this.state.searchData.movieName,
      selectedRating: this.state.searchData.selectedRating,
      fromYear: Number(this.state.searchData.fromYear),
      toYear: Number(this.state.searchData.toYear),
      languageId: this.state.searchData.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };
    this.fetchMovies(body, false);
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
      fromYear: Number(this.state.searchData.fromYear),
      toYear: Number(this.state.searchData.toYear),
      languageId: this.state.searchData.languageId,
      sortColumn: sortColumn,
      sortDirection: sortByDirection,
    };
    this.fetchMovies(body, true);
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
      fromYear: Number(movieDetails.fromYear),
      toYear: Number(movieDetails.toYear),
      languageId: movieDetails.languageId,
      sortColumn: this.state.sortColumn,
      sortDirection: this.state.sortDirection,
    };

    this.fetchMovies(body, true);
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
    } else if (e.target.value == 4) {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 5) {
      sortColumn = sortColumns.releaseDate;
      sortByDirection = sortDirection.asc;
    } else {
      sortColumn = sortColumns.releaseDate;
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
        if (!hideLoader) {
          this.setState(
            {
              isImageLoading: true,
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
        } else {
          this.setState(
            {
              isImageLoading: false,
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

  toggleOpacity = (opacity, movieIndexHovered) => {
    if (opacity === 1) {
      this.setState({
        readMoreOpacity: opacity,
        imageOpacity: 0.2,
        movieIndexHovered,
      });
    } else {
      this.setState({
        readMoreOpacity: opacity,
        imageOpacity: 1,
        movieIndexHovered: -1,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.showLoader && (
          <div id="loaderContainer">
            <div id="loader">
              <LoaderProvider></LoaderProvider>
            </div>
          </div>
        )}
        <div
          style={{
            opacity: this.props.screenOpacity,
            backgroundColor: "#020d18",
          }}
        >
          <Header page={page.details}></Header>
          <div
            className="hero hero3"
            style={{
              background: `url(${image}) no-repeat`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="celeb-container">
              <div className="row">
                <div className="col-md-12">
                  <div class="hero-ct">
                    <h1>
                      {" "}
                      movie listing - {this.state.showGrid ? "grid" : "list"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                          isImageLoading={this.state.isImageLoading}
                        ></List>
                      )}
                      {this.state.showGrid && (
                        <Grid
                          moviesList={this.state.moviesList}
                          toggleOpacity={this.toggleOpacity}
                          readMoreOpacity={this.state.readMoreOpacity}
                          imageOpacity={this.state.imageOpacity}
                          movieIndexHovered={this.state.movieIndexHovered}
                          isImageLoading={this.state.isImageLoading}
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
          <Footer></Footer>
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

const hoc = compose(
  connect(mapStateToProps, mapDispatchToProps),
  NetworkDetector
);

export default hoc(Movies);
