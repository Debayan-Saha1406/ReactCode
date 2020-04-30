/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/movie-single.css";
import image from "../../../images/mv1.jpg";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, pageType } from "../../../Shared/Constants";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import Header from "./../Common/Header";
import Pagination from "./../Common/Pagination";
import Topbar from "../Common/Topbar";
import Searchbox from "../Common/Searchbox";

class MovieGridMain extends Component {
  state = {
    readMoreOpacity: 0,
    redirectToDetail: false,
    redirectToList: false,
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

  toggleReadMoreOpacity = (opacity) => {
    this.setState({ readMoreOpacity: opacity });
  };

  selectList = () => {
    this.setState({ redirectToList: true });
  };

  redirectToDetail = (movieIdClicked, movieName) => {
    this.setState({ redirectToDetail: true, movieIdClicked, movieName });
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
        moviesList: response.data.data.reviews,
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
        moviesList: response.data.data.reviews,
        totalMovies: response.data.data.totalCount,
        pageNumber: page,
      });
    });
  };

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

    if (this.state.redirectToList) {
      return <Redirect to="/movie-list"></Redirect>;
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
          <div className="page-single">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-12 col-xs-12">
                  <Topbar
                    totalMovies={this.state.totalMovies}
                    selectList={this.selectList}
                    pageType={pageType.grid}
                  ></Topbar>
                  <div className="flex-wrap-movielist mv-grid-fw">
                    {this.state.moviesList.map((movie, index) => (
                      <div
                        key={index}
                        className="movie-item-style-2 movie-item-style-1"
                      >
                        <img
                          src={image}
                          alt=""
                          onMouseOver={() => this.toggleReadMoreOpacity(1)}
                          onMouseOut={() => this.toggleReadMoreOpacity(0)}
                        />
                        <div
                          className="hvr-inner"
                          style={{ opacity: this.state.readMoreOpacity }}
                          onMouseOver={() => this.toggleReadMoreOpacity(1)}
                        >
                          <a
                            onClick={() => {
                              this.redirectToDetail(
                                movie.movieId,
                                movie.movieName
                              );
                            }}
                          >
                            {" "}
                            Read more{" "}
                          </a>
                        </div>

                        <div className="mv-item-infor">
                          <h6>
                            <a href="#">{movie.movieName}</a>
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
                        </div>
                      </div>
                    ))}
                  </div>
                  <Pagination
                    pageSize={this.state.pageSize}
                    totalCount={this.state.totalMovies}
                    currentPage={this.state.pageNumber}
                    changeCount={this.changeMovieCount}
                    pageNumberClicked={this.pageNumberClicked}
                    description="Movies"
                  ></Pagination>
                </div>
                <Searchbox
                  title="Search For Movie"
                  movieNameLabel="Movie Name"
                  ratingLabel="Rating Range"
                  releaseYearLabel="Release Year"
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieGridMain);
