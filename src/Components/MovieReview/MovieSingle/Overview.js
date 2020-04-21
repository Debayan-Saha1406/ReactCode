import React from "react";

const Overview = (props) => {
  return (
    <div class="tab-content">
      <div
        id="overview"
        class="tab active"
        style={
          props.selectedTab === "overview"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div class="row">
          <div class="col-md-8 col-sm-12 col-xs-12">
            <p>
              Tony Stark creates the Ultron Program to protect the world, but
              when the peacekeeping program becomes hostile, The Avengers go
              into action to try and defeat a virtually impossible enemy
              together. Earth's mightiest heroes must come together once again
              to protect the world from global extinction.
            </p>
            <div class="title-hd-sm">
              <h4>User reviews</h4>
              <a href="#" class="time">
                See All 56 Reviews <i class="ion-ios-arrow-right"></i>
              </a>
            </div>
            <div class="mv-user-review-item">
              <h3>Best Marvel movie in my opinion</h3>
              <div class="no-star">
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star last"></i>
              </div>
              <p class="time">
                17 December 2016 by <a href="#"> hawaiipierson</a>
              </p>
              <p>
                This is by far one of my favorite movies from the MCU. The
                introduction of new Characters both good and bad also makes the
                movie more exciting. giving the characters more of a back story
                can also help audiences relate more to different characters
                better, and it connects a bond between the audience and actors
                or characters. Having seen the movie three times does not bother
                me here as it is as thrilling and exciting every time I am
                watching it. In other words, the movie is by far better than
                previous movies (and I do love everything Marvel), the plotting
                is splendid (they really do out do themselves in each film,
                there are no problems watching it more than once.
              </p>
            </div>
          </div>
          <div class="col-md-4 col-xs-12 col-sm-12">
            <div class="sb-it">
              <h6>Director: </h6>
              <p>
                <a href="#">Joss Whedon</a>
              </p>
            </div>
            <div class="sb-it">
              <h6>Writer: </h6>
              <p>
                <a href="#">Joss Whedon,</a> <a href="#">Stan Lee</a>
              </p>
            </div>
            <div class="sb-it">
              <h6>Stars: </h6>
              <p>
                <a href="#">Robert Downey Jr,</a> <a href="#">Chris Evans,</a>{" "}
                <a href="#">Mark Ruffalo,</a>
                <a href="#"> Scarlett Johansson</a>
              </p>
            </div>
            <div class="sb-it">
              <h6>Genres:</h6>
              <p>
                <a href="#">Action, </a> <a href="#"> Sci-Fi,</a>{" "}
                <a href="#">Adventure</a>
              </p>
            </div>
            <div class="sb-it">
              <h6>Release Date:</h6>
              <p>May 1, 2015 (U.S.A)</p>
            </div>
            <div class="sb-it">
              <h6>Run Time:</h6>
              <p>141 min</p>
            </div>
            <div class="sb-it">
              <h6>MMPA Rating:</h6>
              <p>PG-13</p>
            </div>
            <div class="sb-it">
              <h6>Plot Keywords:</h6>
              <p class="tags">
                <span class="time">
                  <a href="#">superhero</a>
                </span>
                <span class="time">
                  <a href="#">marvel universe</a>
                </span>
                <span class="time">
                  <a href="#">comic</a>
                </span>
                <span class="time">
                  <a href="#">blockbuster</a>
                </span>
                <span class="time">
                  <a href="#">final battle</a>
                </span>
              </p>
            </div>
            <div class="ads">
              <img src="images/uploads/ads1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
