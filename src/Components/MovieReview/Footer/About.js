/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import image from "../../../images/about.jpg";
import founder from "../../../images/WebsiteFounder.png";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const dispatch = useDispatch();
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    dispatch(toggleLoader(true, 0));
    window.scrollTo({
      top: 0,
    });
    setTimeout(() => {
      dispatch(toggleLoader(false, 1));
    }, 2000);
  }, []);
  return (
    <React.Fragment>
      {showLoader && (
        <div id="loaderContainer">
          <div id="loader">
            <LoaderProvider></LoaderProvider>
          </div>
        </div>
      )}
      <div
        style={{
          backgroundColor: "#020d18",
          opacity: screenOpacity,
        }}
      >
        <Header showSearchBar={true}></Header>
        <main class="main-content">
          <div class="about-container">
            <div class="page">
              <div class="breadcrumbs">
                <Link to="/home">Home</Link>
                <span style={{ color: "#4280bf" }}>About us</span>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <figure>
                    <img src={image} />
                  </figure>
                </div>
                <div class="col-md-8">
                  <p class="leading" style={{ color: "black" }}>
                    <b>The Movie Database</b>
                  </p>
                  <p>
                    Founded in April of 2020 and based in Delhi, India, The
                    Movie Database is a trusted place for people to search for
                    any movie, celebrity or director, post their ratings and
                    also review or favourite any movie.
                  </p>
                  <p>
                    Whether looking for any latest trailers, or the release date
                    of their favorite movies, it connects different users to
                    unique searching experience. Discover movies, celebs by
                    different types of data like average rating, genres, net
                    worth. And with increasing movies and celebs count, The
                    Movie Database is the only place where user can find any
                    detail without much hassle.
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-9">
                  <h2 class="section-title" style={{ fontWeight: "bold" }}>
                    Vision &amp; Mission
                  </h2>
                  <p>
                    To be a world-class movie database committed to bring new
                    content daily for our users from movie and television
                    industry. We harness the strength of the world's diversity
                    to transform our website and deliver a flourishing
                    audio-visual experience to the benefit of all.
                  </p>

                  <p style={{ marginBottom: "40px" }}>
                    To collaborate with all admins to enable the fast addition
                    of the content on a regular basis, bring back users with
                    exciting and new content and promotion of this thriving
                    audiovisual movie database.
                  </p>
                </div>
                <div class="col-md-3">
                  <h2 class="section-title" style={{ fontWeight: "bold" }}>
                    Useful Links
                  </h2>
                  <ul class="arrow">
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <Link to="/celebrities">Celebs</Link>
                    </li>
                    <li>
                      <Link to="/directors">Directors</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 class="section-title" style={{ fontWeight: "bold" }}>
                Our Team
              </h2>
              <div class="row">
                <div class="col-md-12">
                  <div class="team">
                    <figure class="team-image">
                      <img src={founder} alt="" />
                    </figure>
                    <h2 class="team-name">Debayan Saha</h2>
                    <small class="team-title">Founder</small>
                    <div class="social-links">
                      <a href="" class="facebook">
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a href="" class="twitter">
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a href="" class="google-plus">
                        <i class="fa fa-google-plus"></i>
                      </a>
                      <a href="" class="instagram">
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div class="col-md-6">
                <div class="team">
                  <figure class="team-image">
                    <img src="dummy/person-2.jpg" alt="" />
                  </figure>
                  <h2 class="team-name">John Doe</h2>
                  <small class="team-title">Managing Director</small>
                  <div class="social-links">
                    <a href="" class="facebook">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="" class="twitter">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="" class="google-plus">
                      <i class="fa fa-google-plus"></i>
                    </a>
                    <a href="" class="pinterest">
                      <i class="fa fa-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default About;
