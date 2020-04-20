import React, { Component } from "react";
import image from "../../images/logo.png";

class HomeHeader extends Component {
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
                <a href="index.html">Home</a>
              </li>
              <li class="menu-item">
                <a href="about.html">About</a>
              </li>
              <li class="menu-item">
                <a href="review.html">Movie reviews</a>
              </li>
              <li class="menu-item">
                <a href="joinus.html">Join us</a>
              </li>
              <li class="menu-item">
                <a href="contact.html">Contact</a>
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

export default HomeHeader;
