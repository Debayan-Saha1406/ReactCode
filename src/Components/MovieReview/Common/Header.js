/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import image from "../../../images/logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {};
  render() {
    return (
      <header class="site-header">
        <div class="container">
          <a href="index.html" id="branding">
            <img src={image} alt="" class="logo" />
            <div class="logo-copy">
              <h1 class="site-title">Company Name</h1>
              <small class="site-description">Tagline goes here</small>
            </div>
          </a>

          <div class="main-navigation">
            <button type="button" class="menu-toggle">
              <i class="fa fa-bars"></i>
            </button>
            <ul class="menu">
              <li class="menu-item current-menu-item">
                <Link to="/movie">Home</Link>
              </li>
              <li class="menu-item">
                <a>About</a>
              </li>
              <li class="menu-item">
                <Link to="/movie-grid">Movies</Link>
              </li>
              <li class="menu-item">
                <a>Join us</a>
              </li>
              <li class="menu-item">
                <a>Contact</a>
              </li>
            </ul>

            <form action="#" class="search-form">
              <input type="text" placeholder="Search..." />
              <button>
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div class="mobile-navigation"></div>
        </div>
      </header>
    );
  }
}

export default Header;
