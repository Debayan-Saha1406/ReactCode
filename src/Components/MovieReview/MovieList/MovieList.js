/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/movie-single.css";
import image from "../../../images/mv1.jpg";
import Header from "../Common/Header";
import { Redirect } from "react-router-dom";

class MovieList extends Component {
  state = {
    showGrid: false,
  };

  selectGrid = () => {
    this.setState({ showGrid: true });
  };
  render() {
    if (this.state.showGrid) {
      return <Redirect to="/movie-grid"></Redirect>;
    }
    return (
      <div className="background">
        <Header></Header>
        <div class="page-single movie_list">
          <div class="container">
            <div class="row ipad-width2">
              <div class="col-md-8 col-sm-12 col-xs-12">
                <div class="topbar-filter">
                  <p>
                    Found <span>1,608 movies</span> in total
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
                  <a href="movielist.html" class="list">
                    <i class="fa fa-list" aria-hidden="true"></i>
                  </a>
                  <a onClick={this.selectGrid} class="grid">
                    <i class="fa fa-th" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="movie-item-style-2-list">
                  <img src={image} alt="" />
                  <div class="mv-item-infor">
                    <h6>
                      <a href="moviesingle.html">
                        oblivion <span>(2012)</span>
                      </a>
                    </h6>
                    <p class="rate">
                      <i
                        class="fa fa-star"
                        style={{
                          fontSize: "20px",
                          color: "yellow",
                          marginRight: "5px",
                        }}
                      ></i>
                      <span>8.1</span> /10
                    </p>
                    <p class="describe">
                      Earth's mightiest heroes must come together and learn to
                      fight as a team if they are to stop the mischievous Loki
                      and his alien army from enslaving humanity...
                    </p>
                    <p class="run-time">
                      {" "}
                      Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
                      <span>Release: 1 May 2015</span>
                    </p>
                    <p>
                      Director: <a href="#">Joss Whedon</a>
                    </p>
                    <p>
                      Stars: <a href="#">Robert Downey Jr.,</a>{" "}
                      <a href="#">Chris Evans,</a>{" "}
                      <a href="#"> Chris Hemsworth</a>
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2">
                  <img src="images/uploads/mv2.jpg" alt="" />
                  <div class="mv-item-infor">
                    <h6>
                      <a href="moviesingle.html">
                        into the wild <span>(2014)</span>
                      </a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.8</span> /10
                    </p>
                    <p class="describe">
                      As Steve Rogers struggles to embrace his role in the
                      modern world, he teams up with a fellow Avenger and
                      S.H.I.E.L.D agent, Black Widow, to battle a new threat...
                    </p>
                    <p class="run-time">
                      {" "}
                      Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
                      <span>Release: 1 May 2015</span>
                    </p>
                    <p>
                      Director: <a href="#">Anthony Russo,</a>
                      <a href="#">Joe Russo</a>
                    </p>
                    <p>
                      Stars: <a href="#">Chris Evans,</a>{" "}
                      <a href="#">Samuel L. Jackson,</a>{" "}
                      <a href="#"> Scarlett Johansson</a>
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2">
                  <img src="images/uploads/mv3.jpg" alt="" />
                  <div class="mv-item-infor">
                    <h6>
                      <a href="moviesingle.html">
                        blade runner <span>(2015)</span>
                      </a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.3</span> /10
                    </p>
                    <p class="describe">
                      Armed with a super-suit with the astonishing ability to
                      shrink in scale but increase in strength, cat burglar
                      Scott Lang must embrace his inner hero and help...
                    </p>
                    <p class="run-time">
                      {" "}
                      Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
                      <span>Release: 1 May 2015</span>
                    </p>
                    <p>
                      Director: <a href="#">Peyton Reed</a>
                    </p>
                    <p>
                      Stars: <a href="#">Paul Rudd,</a>{" "}
                      <a href="#"> Michael Douglas</a>
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2">
                  <img src="images/uploads/mv4.jpg" alt="" />
                  <div class="mv-item-infor">
                    <h6>
                      <a href="moviesingle.html">
                        Mulholland pride<span> (2013) </span>
                      </a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.2</span> /10
                    </p>
                    <p class="describe">
                      When Tony Stark's world is torn apart by a formidable
                      terrorist called the Mandarin, he starts an odyssey of
                      rebuilding and retribution.
                    </p>
                    <p class="run-time">
                      {" "}
                      Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
                      <span>Release: 1 May 2015</span>
                    </p>
                    <p>
                      Director: <a href="#">Shane Black</a>
                    </p>
                    <p>
                      Stars: <a href="#">Robert Downey Jr., </a>{" "}
                      <a href="#"> Guy Pearce,</a>
                      <a href="#">Don Cheadle</a>
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2">
                  <img src="images/uploads/mv5.jpg" alt="" />
                  <div class="mv-item-infor">
                    <h6>
                      <a href="moviesingle.html">
                        skyfall: evil of boss<span> (2013) </span>
                      </a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.0</span> /10
                    </p>
                    <p class="describe">
                      When Tony Stark's world is torn apart by a formidable
                      terrorist called the Mandarin, he starts an odyssey of
                      rebuilding and retribution.
                    </p>
                    <p class="run-time">
                      {" "}
                      Run Time: 2h21’ . <span>MMPA: PG-13 </span> .{" "}
                      <span>Release: 1 May 2015</span>
                    </p>
                    <p>
                      Director: <a href="#">Alan Taylor</a>
                    </p>
                    <p>
                      Stars: <a href="#">Chris Hemsworth, </a>{" "}
                      <a href="#"> Natalie Portman,</a>
                      <a href="#">Tom Hiddleston</a>
                    </p>
                  </div>
                </div>
                <div class="topbar-filter">
                  <label>Movies per page:</label>
                  <select>
                    <option value="range">5 Movies</option>
                    <option value="saab">10 Movies</option>
                  </select>
                  <div class="pagination2">
                    <span>Page 1 of 2:</span>
                    <a class="active" href="#">
                      1
                    </a>
                    <a href="#">2</a>
                    <a href="#">
                      <i class="ion-arrow-right-b"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-12 col-xs-12">
                <div class="sidebar">
                  <div class="searh-form">
                    <h4 class="sb-title">Search for movie</h4>
                    <form class="form-style-1" action="#">
                      <div class="row">
                        <div class="col-md-12 form-it">
                          <label>Movie name</label>
                          <input type="text" placeholder="Enter keywords" />
                        </div>
                        <div class="col-md-12 form-it">
                          <label>Genres & Subgenres</label>
                          <div class="group-ip">
                            <select
                              name="skills"
                              multiple=""
                              class="ui fluid dropdown"
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
                        <div class="col-md-12 form-it">
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
                        <div class="col-md-12 form-it">
                          <label>Release Year</label>
                          <div class="row">
                            <div class="col-md-6">
                              <select>
                                <option value="range">From</option>
                                <option value="number">10</option>
                                <option value="number">20</option>
                                <option value="number">30</option>
                              </select>
                            </div>
                            <div class="col-md-6">
                              <select>
                                <option value="range">To</option>
                                <option value="number">20</option>
                                <option value="number">30</option>
                                <option value="number">40</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 ">
                          <input class="submit" type="submit" value="submit" />
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
    );
  }
}

export default MovieList;
