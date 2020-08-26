/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import windowSize from "react-window-size";

const CoverPhoto = (props) => {
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
                <img class="fancybox-image" src={props.coverPhoto} alt="" />
              </div>
            </div>
            <a
              title="Close"
              class="fancybox-item fancybox-close"
              id="close-cross"
              data-ol-has-click-handler=""
              onClick={props.closePhoto}
            ></a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default windowSize(CoverPhoto);
