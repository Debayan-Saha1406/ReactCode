/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../css/sideBar.css";
import { connect } from "react-redux";
import image from "../../images/logo.jpg";
import "../../css/style.css";

const style = {
  backgroundImage: `url(${image})`
};

class SideBar extends Component {
  state = {};

  render() {
    return (
      <nav id="sidebar" className={this.props.sideBarClassName}>
        <div className="p-4 pt-5">
          <a href="#" className="img logo rounded-circle mb-5" style={style}></a>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Home
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="#">Home 1</a>
                </li>
                <li>
                  <a href="#">Home 2</a>
                </li>
                <li>
                  <a href="#">Home 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
              >
                Pages
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Page 1</a>
                </li>
                <li>
                  <a href="#">Page 2</a>
                </li>
                <li>
                  <a href="#">Page 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    sideBarClassName: state.sideBarReducer.sideBarClassName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onSideBarToggle: () => {
    //   dispatch(toggleSideBar());
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
