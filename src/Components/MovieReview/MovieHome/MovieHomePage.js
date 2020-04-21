import React, { Component } from "react";
import "../../../css/home.css";
import Header from "../Common/Header";
import Main from "./Main";

class MovieHomePage extends Component {
  state = {};
  render() {
    return (
      <div className="background">
        <div id="site-content">
          <Header></Header>
          <main class="main-content">
            <Main></Main>
          </main>
        </div>
      </div>
    );
  }
}

export default MovieHomePage;
