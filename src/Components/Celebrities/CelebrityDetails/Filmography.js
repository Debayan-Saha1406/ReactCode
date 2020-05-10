/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DetailTopBar from "../../MovieReview/Common/DetailTopBar";
import image from "../../../images/movie-single.jpg";

const Filmography = () => {
  return (
    <div class="filmography">
      <div>
        <h3>Filmography of</h3>
        <h2>Hugh Jackman</h2>
      </div>

      <DetailTopBar totalCount={10}></DetailTopBar>
      <div class="mvcast-item">
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src={image} alt="" />
            <div>
              <a href="#">X-Men: Apocalypse </a>
              <p class="time">Logan</p>
            </div>
          </div>
          <p>... 2016</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film2.jpg" alt="" />
            <div>
              <a href="#">Eddie the Eagle </a>
              <p class="time">Bronson Peary</p>
            </div>
          </div>
          <p>... 2015</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film3.jpg" alt="" />
            <div>
              <a href="#">Me and Earl and the Dying Girl </a>
              <p class="time">Hugh Jackman</p>
            </div>
          </div>
          <p>... 2015</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film4.jpg" alt="" />
            <div>
              <a href="#">Night at the Museum 3 </a>
              <p class="time">Blackbeard</p>
            </div>
          </div>
          <p>... 2014</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film5.jpg" alt="" />
            <div>
              <a href="#">X-Men: Days of Future Past </a>
              <p class="time">Wolverine</p>
            </div>
          </div>
          <p>... 2012</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film6.jpg" alt="" />
            <div>
              <a href="#">The Wolverine </a>
              <p class="time">Logan</p>
            </div>
          </div>
          <p>... 2011</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film7.jpg" alt="" />
            <div>
              <a href="#">Rise of the Guardians </a>
              <p class="time">Bunny</p>
            </div>
          </div>
          <p>... 2011</p>
        </div>
        <div class="cast-it">
          <div class="cast-left cebleb-film">
            <img src="images/uploads/film8.jpg" alt="" />
            <div>
              <a href="#">The Prestige </a>
              <p class="time">Robert Angier</p>
            </div>
          </div>
          <p>... 2010</p>
        </div>
      </div>
    </div>
  );
};

export default Filmography;
