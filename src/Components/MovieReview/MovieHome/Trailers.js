/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReactPlayer from "react-player";

const Trailers = (props) => {
  const [isVideoVisible, showVideo] = useState(false);
  const leadingMovie = props.movieTrailers[0];
  const [youtubeUrl, setYoutubeUrl] = useState(leadingMovie.youtubeUrl);
  //props.movieTrailers.shift();
  return (
    <div className="col-md-12">
      <div
        className="title-hd"
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
              <i className="fa fa-times-circle"></i>
            </div>
            <ReactPlayer
              url={youtubeUrl}
              controls={true}
              style={{ backgroundColor: "black" }}
            />
          </div>
        </div>
      )}
      <div className="trailers-videos">
        <div className="row">
          <div className="trailer-item leading col-sm-12">
            <div className="trailer">
              <div className="trailer-image-wrap">
                <img
                  className="img-responsive"
                  src={leadingMovie.image}
                  alt="trailers"
                  style={{ width: "inherit" }}
                />
                <a
                  className="play-video"
                  data-type="youtube"
                  data-ol-has-click-handler=""
                  onClick={() => {
                    showVideo(true);
                    setYoutubeUrl(leadingMovie.youtubeUrl);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-play-circle"
                    aria-hidden="true"
                    id="playIcon"
                  ></i>
                </a>
                <div className="content-wrap">
                  <div className="video-container">
                    <span className="video-close" data-ol-has-click-handler="">
                      x
                    </span>
                  </div>
                </div>
              </div>
              <div className="trailer-info trailers-info">
                <div className="trailer-info-block">
                  <h3 className="movie-title">
                    {leadingMovie.movieName}(
                    {leadingMovie.releaseDate.substring(
                      leadingMovie.releaseDate.indexOf(",") + 2,
                      leadingMovie.releaseDate.length
                    )}
                    )
                  </h3>
                  <p className="genry">{leadingMovie.genre} </p>
                </div>
              </div>
            </div>
          </div>
          {props.movieTrailers.map((movie, index) => (
            <React.Fragment key={index}>
              {index !== 0 && (
                <div className="trailer-item subleading col-sm-3">
                  <div className="trailer">
                    <div className="trailer-image-wrap">
                      <img
                        className="img-responsive"
                        src={movie.image}
                        alt="trailers"
                      />
                      <a
                        className="play-video"
                        onClick={() => {
                          showVideo(true);
                          setYoutubeUrl(movie.youtubeUrl);
                        }}
                        style={{ cursor: "pointer" }}
                        data-type="youtube"
                        data-ol-has-click-handler=""
                      >
                        <i
                          className="fa fa-play-circle"
                          aria-hidden="true"
                          id="playIcon"
                        ></i>
                      </a>
                      <div className="content-wrap">
                        <div className="video-container">
                          <span
                            className="video-close"
                            data-ol-has-click-handler=""
                          >
                            x
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="trailer-info trailers-info">
                      <div className="trailer-info-block">
                        <h3 className="movie-title">
                          {movie.movieName}(
                          {movie.releaseDate.substring(
                            movie.releaseDate.indexOf(",") + 2,
                            movie.releaseDate.length
                          )}
                          )
                        </h3>
                        <p className="genry">{movie.genre} </p>
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
