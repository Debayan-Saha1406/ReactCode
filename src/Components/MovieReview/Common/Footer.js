/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import image from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { menuItem } from "../../../Shared/Constants";

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
              <p
                style={{
                  marginBottom: "40px",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                The Movie Database
              </p>
            </a>

            <p>
              Block-A, Second Floor
              <br />
              Bestech Business Tower Sohna Road
            </p>
            <p>Sector-48 Gurgaon, 122018</p>
            <p>
              Call us: <a id="back-to-top">0124 464 7684</a>
            </p>
          </div>
          <div className="flex-child-ft item2">
            <h4>Resources</h4>
            <ul>
              <li>
                {window.location.pathname.includes(menuItem.about) ? (
                  <Link
                    style={{ color: "#dcf836", cursor: "pointer" }}
                    className="footer-content"
                    to="/about"
                  >
                    About
                  </Link>
                ) : (
                  <Link
                    style={{ color: "#abb7c4", cursor: "pointer" }}
                    to="/about"
                    className="footer-content"
                  >
                    About
                  </Link>
                )}
              </li>
              <li>
                {" "}
                <Link
                  style={{ color: "#abb7c4" }}
                  //to="/about"
                  // className="footer-content"
                >
                  Help Center
                </Link>
              </li>
              {window.location.pathname.includes(menuItem.contactUs) ? (
                <li>
                  <Link
                    style={{ color: "#dcf836", cursor: "pointer" }}
                    to="/contactUs"
                    className="footer-content"
                  >
                    Contact Us
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    style={{ color: "#abb7c4", cursor: "pointer" }}
                    to="/contactUs"
                    className="footer-content"
                  >
                    Contact Us
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="flex-child-ft item5">
            <h4>Legal</h4>
            <ul>
              {window.location.pathname.includes(menuItem.privacyPolicy) ? (
                <li>
                  <Link
                    style={{ color: "#dcf836", cursor: "pointer" }}
                    to="/privacy-policy"
                    className="footer-content"
                  >
                    Privacy Policy
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    style={{ color: "#abb7c4", cursor: "pointer" }}
                    to="/privacy-policy"
                    className="footer-content"
                  >
                    Privacy Policy
                  </Link>
                </li>
              )}
              {window.location.pathname.includes(menuItem.termsOfUse) ? (
                <li>
                  <Link
                    style={{ color: "#dcf836", cursor: "pointer" }}
                    to="/terms-of-use"
                    className="footer-content"
                  >
                    Terms Of Use
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    style={{ color: "#abb7c4", cursor: "pointer" }}
                    to="/terms-of-use"
                    className="footer-content"
                  >
                    Terms Of Use
                  </Link>
                </li>
              )}
            </ul>
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
