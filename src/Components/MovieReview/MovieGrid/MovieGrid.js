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
          <main class="main-content">
            <MovieGridMain></MovieGridMain>
          </main>
        </div>
      </div>
    );
  }
}

export default MovieGrid;
