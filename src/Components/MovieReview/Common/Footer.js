/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import image from "../../../images/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="ht-footer">
      <div className="container">
        <div className="flex-parent-ft">
          <div className="flex-child-ft item1">
            <a>
              <img className="logo" src={image} alt="" />
            </a>
            <p>
              5th Avenue st, manhattan
              <br />
              New York, NY 10001
            </p>
            <p>
              Call us: <a id="back-to-top">(+01) 202 342 6789</a>
            </p>
          </div>
          <div className="flex-child-ft item2">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="flex-child-ft item5">
            <h4>Newsletter</h4>
            <p>
              Subscribe to our newsletter system now <br /> to get latest news
              from us.
            </p>
            <form action="#">
              <input type="text" placeholder="Enter your email..." />
            </form>
            <a href="#" className="btn">
              Subscribe now <i className="ion-ios-arrow-forward"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="ft-copyright">
        <div className="ft-left">
          <p>
            © 2017 Movie Database. All Rights Reserved. Designed by Debayan.
          </p>
        </div>
        <div className="backtotop">
          <p>
            <a id="back-to-top" onClick={scrollToTop}>
              Back to top <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
