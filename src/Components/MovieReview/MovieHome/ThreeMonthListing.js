/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { monthNames } from "../../../Shared/Constants";

class ThreeMonthListing extends Component {
  state = {
    threeMonths: [],
  };
  componentDidMount() {
    let threeMonths = [...this.state.threeMonths];
    for (let i = 0; i <= 2; i++) {
      threeMonths.push(monthNames[new Date().getMonth() + i]);
    }
    this.setState({ threeMonths });
  }

  render() {
    return (
      <div class="row">
        {this.state.threeMonths.map((month, index) => (
          <div key={index} class="col-md-4">
            <h2 class="section-title">{month} release</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <ul class="movie-schedule">
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default ThreeMonthListing;
