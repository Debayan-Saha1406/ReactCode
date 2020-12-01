/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ImageGalleryLoader from "./ImageGalleryLoader";
import windowSize from "react-window-size";

const Gallery = (props) => {
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
                    {props.showloader && (
                      <ImageGalleryLoader></ImageGalleryLoader>
                    )}
                  </div>
                </div>
                <img
                  class="fancybox-image"
                  src={
                    props.currentImage
                      ? props.currentImage
                      : props.galleryImages[0]
                  }
                  alt=""
                  onLoad={props.handleImageLoad}
                  style={{ opacity: props.opacity }}
                />
              </div>
              {props.galleryImages.length > 1 && (
                <React.Fragment>
                  <a
                    title="Previous"
                    class="fancybox-nav fancybox-prev"
                    data-ol-has-click-handler=""
                    onMouseOver={() =>
                      props.changeVisibility(
                        true,
                        props.setPreviousButtonVisibility
                      )
                    }
                    onMouseOut={() =>
                      props.changeVisibility(
                        false,
                        props.setPreviousButtonVisibility
                      )
                    }
                    onClick={props.fetchPreviousImage}
                  >
                    <span
                      style={{ visibility: props.previousButtonVisibility }}
                    ></span>
                  </a>
                  <a
                    title="Next"
                    class="fancybox-nav fancybox-next"
                    data-ol-has-click-handler=""
                    onMouseOver={() =>
                      props.changeVisibility(
                        true,
                        props.setNextButtonVisibility
                      )
                    }
                    onMouseOut={() =>
                      props.changeVisibility(
                        false,
                        props.setNextButtonVisibility
                      )
                    }
                    onClick={props.fetchNextImage}
                  >
                    <span
                      style={{ visibility: props.nextButtonVisibility }}
                    ></span>
                  </a>
                </React.Fragment>
              )}
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
