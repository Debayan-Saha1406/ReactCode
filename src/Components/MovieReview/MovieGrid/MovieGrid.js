import React, { Component } from "react";
import Header from "../Common/Header";
import MovieGridMain from "./MovieGrid-Main";

class MovieGrid extends Component {
  state = {};
  render() {
    return (
      <div className="background">
        <div id="site-content">
          <Header></Header>
          {/* <MovieGridMain></MovieGridMain> */}
        </div>
      </div>
    );
  }
}

export default MovieGrid;
