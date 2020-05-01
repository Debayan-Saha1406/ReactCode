/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/movie-single.css";
import image from "../../../images/mv1.jpg";
import Header from "../Common/Header";
import { Redirect } from "react-router-dom";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, pageType } from "../../../Shared/Constants";
import Pagination from "./../Common/Pagination";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import Topbar from "../Common/Topbar";
import Searchbox from "../Common/Searchbox";
import { movieSearchType } from "./../../../Shared/Constants";

class MovieList extends Component {
  state = {
    showGrid: false,
    pageNumber: 1,
    pageSize: 10,
    searchQuery: "",
    moviesList: [],
    totalMovies: 0,
    movieIdClicked: 0,
    movieName: "",
  };

  componentDidMount() {
    this.props.toggleLoader(true, 0);
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchQuery: this.state.searchQuery,
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
  }

  selectGrid = () => {
    this.setState({ showGrid: true });
  };

  changeMovieCount = (e) => {
    this.setState({ pageSize: e.target.value });
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: e.target.value,
      searchQuery: "",
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
      searchQuery: "",
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        moviesList: response.data.data.details,
        totalMovies: response.data.data.totalCount,
        pageNumber: page,
      });
    });
  };

  redirectToDetail = (movieId, movieName) => {
    console.log(movieName);
    this.setState({
      redirectToDetail: true,
      movieIdClicked: movieId,
      movieName,
    });
  };

  getFilteredMovies = (e, movieName, selectedRating, fromYear, toYear) => {
    e.preventDefault();
    let searchType = this.setSearchType(
      movieName,
      selectedRating,
      fromYear,
      toYear
    );

    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchType: searchType,
      movieName: movieName ? movieName : null,
      selectedRating: selectedRating != 0 ? selectedRating : 0,
      fromYear: fromYear != 0 ? fromYear : null,
      toYear: toYear != 0 ? toYear : null,
    };
    ServiceProvider.post(apiUrl.movies, body).then((response) => {
      this.setState({
        moviesList: response.data.data.details,
        totalMovies: response.data.data.totalCount,
      });
    });
  };

  setSearchType(movieName, selectedRating, fromYear, toYear) {
    let searchType;
    if (movieName && selectedRating != 0 && fromYear != 0 && toYear != 0) {
      searchType = movieSearchType.all;
    } else if (movieName && selectedRating != 0) {
      searchType = movieSearchType.both;
    } else if (movieName && fromYear != 0 && toYear != 0) {
      searchType = movieSearchType.movieReleaseYear;
    } else if (selectedRating != 0 && fromYear != 0 && toYear != 0) {
      searchType = movieSearchType.ratingReleaseYear;
    } else if (movieName) {
      searchType = movieSearchType.movie;
    } else if (selectedRating != 0) {
      searchType = movieSearchType.rating;
    } else if (fromYear != 0 && toYear != 0) {
      searchType = movieSearchType.releaseYear;
    }
    return searchType;
  }

  render() {
    if (this.state.redirectToDetail) {
      return (
        <Redirect
          to={{
            pathname: `/movie-single/${this.state.movieName}`,
            state: { movieId: this.state.movieIdClicked },
          }}
        />
      );
    }

    if (this.state.showGrid) {
      return <Redirect to="/movie-grid"></Redirect>;
    }
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
                    totalMovies={this.state.totalMovies}
                    selectGrid={this.selectGrid}
                    pageType={pageType.list}
                  ></Topbar>
                  {this.state.moviesList.map((movie, index) => (
                    <div key={index} className="movie-item-style-2-list">
                      <img src={image} alt="" />
                      <div className="mv-item-infor">
                        <h6
                          className="heading"
                          onClick={() =>
                            this.redirectToDetail(
                              movie.movieId,
                              movie.movieName
                            )
                          }
                        >
                          {movie.movieName} <span>(2012)</span>
                        </h6>
                        <p className="rate">
                          <i
                            className="fa fa-star"
                            style={{
                              fontSize: "20px",
                              color: "yellow",
                              marginRight: "5px",
                            }}
                          ></i>
                          <span>{movie.avgRating}</span> /10
                        </p>
                        <p className="describe">
                          {movie.description.length > 200
                            ? movie.description.substring(0, 200) + "..."
                            : movie.description}
                        </p>
                        <p className="run-time">
                          {" "}
                          Run Time: {movie.runTime} <br></br>
                          <span>Release: {movie.releaseDate}</span>
                        </p>
                        <p>
                          Language: <a href="#">{movie.language}</a>
                        </p>
                      </div>
                    </div>
                  ))}

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

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
