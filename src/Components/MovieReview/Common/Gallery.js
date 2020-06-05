/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import ImageGalleryLoader from "./ImageGalleryLoader";
import windowSize from "react-window-size";

const Gallery = (props) => {
  const [nextButtonVisibility, setNextButtonVisibility] = useState("hidden");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [previousButtonVisibility, setPreviousButtonVisibility] = useState(
    "hidden"
  );
  const [showloader, toggleLoader] = useState(false);
  const [opacity, toggleOpacity] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    toggleLoader(true);
    ServiceProvider.getWithParam(apiUrl.movieGalleryImages, props.movieId).then(
      (response) => {
        if (response.status === 200) {
          setGalleryImages(response.data.data.imageUrls);
        }
      }
    );
  }, []);

  const changeVisibility = (showButton, setButtonVisibility) => {
    if (showButton) {
      setButtonVisibility("visible");
    } else {
      setButtonVisibility("hidden");
    }
  };

  const fetchPreviousImage = () => {
    toggleLoader(true);
    if (currentIndex !== 0) {
      setCurrentImage(galleryImages[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentImage(galleryImages[galleryImages.length - 1]);
      setCurrentIndex(galleryImages.length - 1);
    }
  };

  const fetchNextImage = () => {
    toggleLoader(true);
    toggleOpacity(0.2);
    if (currentIndex !== galleryImages.length - 1) {
      setCurrentImage(galleryImages[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentImage(galleryImages[0]);
      setCurrentIndex(0);
    }
  };

  const handleImageLoad = () => {
    toggleLoader(false);
    toggleOpacity(1);
  };
  return (
    <React.Fragment>
      <div
        class="fancybox-overlay fancybox-overlay-fixed"
        style={{ width: "auto", height: "auto", display: "block" }}
        data-ol-has-click-handler=""
      >
        <div
          class="fancybox-wrap fancybox-desktop fancybox-type-image fancybox-opened"
          id="fancybox-width"
          tabindex="-1"
          style={{
            height: "auto",
            position: "absolute",
            opacity: "1",
            overflow: "visible",
            width: props.windowWidth - 40 < 973 ? props.windowWidth - 40 : 973,
            left: props.windowWidth - 40 < 1023 ? "20px" : "20%",
          }}
        >
          <div
            class="fancybox-skin"
            style={{ padding: "15px", width: "auto", height: "auto" }}
          >
            <div class="fancybox-outer">
              <div
                class="fancybox-inner"
                id="fancybox-inner-dimensions"
                style={{
                  overflow: "visible",
                  width:
                    props.windowWidth - 70 < 943 ? props.windowWidth - 70 : 943,
                }}
              >
                <div id="loaderContainer">
                  <div id="loader">
                    {showloader && <ImageGalleryLoader></ImageGalleryLoader>}
                  </div>
                </div>
                <img
                  class="fancybox-image"
                  src={currentImage ? currentImage : galleryImages[0]}
                  alt=""
                  onLoad={handleImageLoad}
                  style={{ opacity: opacity }}
                />
              </div>
              <a
                title="Previous"
                class="fancybox-nav fancybox-prev"
                data-ol-has-click-handler=""
                onMouseOver={() =>
                  changeVisibility(true, setPreviousButtonVisibility)
                }
                onMouseOut={() =>
                  changeVisibility(false, setPreviousButtonVisibility)
                }
                onClick={fetchPreviousImage}
              >
                <span style={{ visibility: previousButtonVisibility }}></span>
              </a>
              <a
                title="Next"
                class="fancybox-nav fancybox-next"
                data-ol-has-click-handler=""
                onMouseOver={() =>
                  changeVisibility(true, setNextButtonVisibility)
                }
                onMouseOut={() =>
                  changeVisibility(false, setNextButtonVisibility)
                }
                onClick={fetchNextImage}
              >
                <span style={{ visibility: nextButtonVisibility }}></span>
              </a>
            </div>
            <a
              title="Close"
              class="fancybox-item fancybox-close"
              id="close-cross"
              data-ol-has-click-handler=""
              onClick={props.closeGallery}
            >
              {/* <i class="fa fa-times-circle"></i> */}
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default windowSize(Gallery);
