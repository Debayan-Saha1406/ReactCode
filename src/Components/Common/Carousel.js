import React from "react";
import CarouselSlider from "react-carousel-slider";

let data = [
  {
    des: "1",
    imgSrc:
      "https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg",
  },
  {
    des: "2",
    imgSrc:
      "https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg",
  },
  {
    des: "2",
    imgSrc:
      "https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg",
  },
  {
    des: "2",
    imgSrc:
      "https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg",
  },
];

let buttonSetting = {
  placeOn: "middle-outside",
  style: {
    left: {
      color: "white",
      background: "black",
      border: "1px solid #e1e4e8",
      borderRadius: "50%",
    },
    right: {
      color: "white",
      background: "black",
      border: "1px solid #e1e4e8",
      borderRadius: "50%",
    },
  },
};

let customSlideCpnts = data.map((item, index) => (
  <React.Fragment>
    <img src={item.imgSrc} />
  </React.Fragment>
));

const Carousel = () => {
  return (
    <CarouselSlider
      slideCpnts={customSlideCpnts}
      manner={{
        circular: false,
        autoSliding: { interval: "1s" },
        duration: "1.5s",
      }}
      buttonSetting={buttonSetting}
      autoSliding={5}
    />
  );
};

export default Carousel;
