/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Overview from "../CelebrityDetails/Overview";
import Header from "./../../MovieReview/Common/Header";
import "../../../css/movie-single.css";
import image from "../../../images/movie-single.jpg";
import { page } from "../../../Shared/Constants";

const CelebrityDetails = (props) => {
  return (
    <div>
      <Header page={page.details}></Header>
      <div class="hero hero3">
        <div class="celeb-container">
          <div class="row">
            <div class="col-md-12"></div>
          </div>
        </div>
      </div>

      <div class="celebrity-single movie-single cebleb-single">
        <div class="container">
          <div class="row ipad-width">
            <div class="col-md-4 col-sm-12 col-xs-12">
              <div class="mv-ceb">
                <img src={image} alt="" />
              </div>
            </div>
            <div class="col-md-8 col-sm-12 col-xs-12">
              <div class="movie-single-ct">
                <h1 class="bd-hd">Hugh Jackman</h1>
                <p class="ceb-single">Actor | Producer</p>
                <div class="movie-tabs">
                  <div class="tabs">
                    <ul class="tab-links tabs-mv">
                      <li class="active">
                        <a href="#overviewceb">Overview</a>
                      </li>
                      <li>
                        <a href="#biography"> biography</a>
                      </li>
                      <li>
                        <a href="#filmography">filmography</a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div id="overviewceb" class="tab active">
                        <div class="row">
                          <Overview></Overview>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityDetails;
