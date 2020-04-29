/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/movie-single.css";
import image from "../../../images/mv1.jpg";
import Header from "../Common/Header";
import { Redirect } from "react-router-dom";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";
import Pagination from "./../Common/Pagination";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import { connect } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";

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

  redirectToDetail = (movieId, movieName) => {
    console.log(movieName);
    this.setState({
      redirectToDetail: true,
      movieIdClicked: movieId,
      movieName,
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
                  <div className="topbar-filter">
                    <p>
                      Found <span>{this.state.totalMovies}</span> in total
                    </p>
                    <label className="filterBy"> Sort by:</label>
                    <select>
                      <option value="popularity">Popularity Descending</option>
                      <option value="popularity">Popularity Ascending</option>
                      <option value="rating">Rating Descending</option>
                      <option value="rating">Rating Ascending</option>
                      <option value="date">Release date Descending</option>
                      <option value="date">Release date Ascending</option>
                    </select>
                    <a className="list">
                      <i className="fa fa-list" aria-hidden="true"></i>
                    </a>
                    <a onClick={this.selectGrid} className="grid">
                      <i className="fa fa-th" aria-hidden="true"></i>
                    </a>
                  </div>
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

                  <Pagination
                    pageSize={this.state.pageSize}
                    totalCount={this.state.totalMovies}
                    currentPage={this.state.pageNumber}
                    changeCount={this.changeMovieCount}
                    pageNumberClicked={this.pageNumberClicked}
                    description="Movies"
                  ></Pagination>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="sidebar">
                    <div className="searh-form">
                      <h4 className="sb-title">Search for movie</h4>
                      <form className="form-style-1" action="#">
                        <div className="row">
                          <div className="col-md-12 form-it">
                            <label>Movie name</label>
                            <input type="text" placeholder="Enter keywords" />
                          </div>
                          <div className="col-md-12 form-it">
                            <label>Genres & Subgenres</label>
                            <div className="group-ip">
                              <select
                                name="skills"
                                multiple=""
                                className="ui fluid dropdown"
                              >
                                <option value="">Enter to filter genres</option>
                                <option value="Action1">Action 1</option>
                                <option value="Action2">Action 2</option>
                                <option value="Action3">Action 3</option>
                                <option value="Action4">Action 4</option>
                                <option value="Action5">Action 5</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12 form-it">
                            <label>Rating Range</label>

                            <select>
                              <option value="range">
                                -- Select the rating range below --
                              </option>
                              <option value="saab">
                                -- Select the rating range below --
                              </option>
                              <option value="saab">
                                -- Select the rating range below --
                              </option>
                              <option value="saab">
                                -- Select the rating range below --
                              </option>
                            </select>
                          </div>
                          <div className="col-md-12 form-it">
                            <label>Release Year</label>
                            <div className="row">
                              <div className="col-md-6">
                                <select>
                                  <option value="range">From</option>
                                  <option value="number">10</option>
                                  <option value="number">20</option>
                                  <option value="number">30</option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <select>
                                  <option value="range">To</option>
                                  <option value="number">20</option>
                                  <option value="number">30</option>
                                  <option value="number">40</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 ">
                            <input
                              className="submit"
                              type="submit"
                              value="submit"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
