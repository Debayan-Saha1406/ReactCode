import React, { Component } from "react";
import { connect } from "react-redux";
import MoviesCount from "./MoviesCountComponent";
import "../css/movieCount.css";

class Main extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          opacity: this.props.screenOpacity,
        }}
      >
        <div className="row m-t-25">
          <MoviesCount></MoviesCount>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

export default connect(mapStateToProps, null)(Main);
