import React, { Component } from "react";
import "../../css/home.css";
import HomeHeader from "./HomeHeader";
import Main from "./Main";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="background">
        <div id="site-content">
          <HomeHeader></HomeHeader>
          <main class="main-content">
            <Main></Main>
          </main>
        </div>
      </div>
    );
  }
}

export default Home;
