/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReactPlayer from "react-player";

const Trailers = (props) => {
  const [isVideoVisible, showVideo] = useState(false);
  const leadingMovie = props.movieTrailers[0];
  const [youtubeUrl, setYoutubeUrl] = useState(leadingMovie.youtubeUrl);
  //props.movieTrailers.shift();
  return (
    <div class="col-md-12">
      <div
        class="title-hd"
        style={{ paddingTop: "20px", paddingBottom: "20px" }}
      >
        <h2>Latest Trailers</h2>
      </div>
      {isVideoVisible && (
        <div className="overlay openform">
          <div className="login-wrapper" id="login-content">
            <div
              className="close-cross"
              onClick={() => showVideo(false)}
              style={{ cursor: "pointer" }}
            >
              <i class="fa fa-times-circle"></i>
            </div>
            <ReactPlayer
              url={youtubeUrl}
              controls={true}
              style={{ backgroundColor: "black" }}
            />
          </div>
        </div>
      )}
      <div class="trailers-videos">
        <div class="row">
          <div class="trailer-item leading col-sm-12">
            <div class="trailer">
              <div class="trailer-image-wrap">
                <img
                  class="img-responsive"
                  src={leadingMovie.image}
                  alt="trailers"
                  style={{ width: "inherit" }}
                />
                <a
                  class="play-video"
                  data-type="youtube"
                  data-ol-has-click-handler=""
                  onClick={() => {
                    showVideo(true);
                    setYoutubeUrl(leadingMovie.youtubeUrl);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    class="fa fa-play-circle"
                    aria-hidden="true"
                    id="playIcon"
                  ></i>
                </a>
                <div class="content-wrap">
                  <div class="video-container">
                    <span class="video-close" data-ol-has-click-handler="">
                      x
                    </span>
                  </div>
                </div>
              </div>
              <div class="trailer-info trailers-info">
                <div class="trailer-info-block">
                  <h3 class="movie-title">
                    {leadingMovie.movieName}(
                    {leadingMovie.releaseDate.substring(
                      leadingMovie.releaseDate.indexOf(",") + 2,
                      leadingMovie.releaseDate.length
                    )}
                    )
                  </h3>
                  <p class="genry">{leadingMovie.genre} </p>
                </div>
              </div>
            </div>
          </div>
          {props.movieTrailers.map((movie, index) => (
            <React.Fragment>
              {index !== 0 && (
                <div class="trailer-item subleading col-sm-3">
                  <div class="trailer">
                    <div class="trailer-image-wrap">
                      <img
                        class="img-responsive"
                        src={movie.image}
                        alt="trailers"
                      />
                      <a
                        class="play-video"
                        onClick={() => {
                          showVideo(true);
                          setYoutubeUrl(movie.youtubeUrl);
                        }}
                        style={{ cursor: "pointer" }}
                        data-type="youtube"
                        data-ol-has-click-handler=""
                      >
                        <i
                          class="fa fa-play-circle"
                          aria-hidden="true"
                          id="playIcon"
                        ></i>
                      </a>
                      <div class="content-wrap">
                        <div class="video-container">
                          <span
                            class="video-close"
                            data-ol-has-click-handler=""
                          >
                            x
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="trailer-info trailers-info">
                      <div class="trailer-info-block">
                        <h3 class="movie-title">
                          {movie.movieName}(
                          {movie.releaseDate.substring(
                            movie.releaseDate.indexOf(",") + 2,
                            movie.releaseDate.length
                          )}
                          )
                        </h3>
                        <p class="genry">{movie.genre} </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trailers;
