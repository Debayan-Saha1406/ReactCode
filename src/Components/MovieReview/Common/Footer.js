/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import image from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { menuItem } from "../../../Shared/Constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const history = useHistory();
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
                    to="/about"
                  >
                    About
                  </Link>
                ) : (
                  <Link
                    style={{ color: "#abb7c4", cursor: "pointer" }}
                    to="/about"
                  >
                    About
                  </Link>
                )}
              </li>
              <li>
                {" "}
                <Link
                  style={{ color: "#abb7c4", cursor: "pointer" }}
                  to="/about"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-child-ft item3">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i
                  className="fa fa-facebook-official"
                  style={{ fontSize: "36px", color: "white" }}
                ></i>
              </li>
              <li>
                <i
                  class="fa fa-instagram"
                  style={{ fontSize: "36px", color: "white" }}
                ></i>
              </li>
            </ul>
          </div>

          <div className="flex-child-ft item5">
            <h4>Legal</h4>
            <ul>
              <li style={{ color: "#abb7c4" }}>Privacy Policy</li>
              <li style={{ color: "#abb7c4" }}>Terms Of Use</li>
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
