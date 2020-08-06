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
                  <p class="leading">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium totam.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit consectetur adipisci velit,
                    sed quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
                    veniam, quis nostrum exercitationem ullam corporis suscipit
                    laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
                    autem vel eum iure reprehenderit qui in ea voluptate velit
                    esse quam.
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-9">
                  <h2 class="section-title">Vision &amp; Misssion</h2>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                    fugit, sed quia consequuntur magni dolores eos qui ratione
                    voluptatem sequi nesciunt.{" "}
                  </p>

                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    consectetur adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut labore et dolore magnam aliquam quaerat
                    voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid ex ea commodi consequatur? Quis autem vel eum iure
                    reprehenderit qui in ea voluptate velit esse quam
                    dignissimos ducimus qui blanditiis praesentium voluptatum
                    atque.
                  </p>
                </div>
                <div class="col-md-3">
                  <h2 class="section-title">Useful Links</h2>
                  <ul class="arrow">
                    <li>
                      <a href="#">Eiusmod tempor incididunt</a>
                    </li>
                    <li>
                      <a href="#">Tenim ad minim venia</a>
                    </li>
                    <li>
                      <a href="#">Quis nostrud exercitation</a>
                    </li>
                    <li>
                      <a href="#">Ullamco laboris reprehenderit</a>
                    </li>
                    <li>
                      <a href="#">Duis aute dolor voluptat</a>
                    </li>
                    <li>
                      <a href="#">Velit esse cillum dolore</a>
                    </li>
                    <li>
                      <a href="#">Excepteur sint occaeca</a>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 class="section-title">Our Team</h2>
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
