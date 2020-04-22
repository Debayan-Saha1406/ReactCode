import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

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

const content = [
  {
    title: "Vulputate Mollis Ultricies Fermentum Parturient",
    description:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
    button: "Read More",
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png",
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
];

const Carousel = () => {
  return (
    <Slider className="slider-wrapper" autoplay={2000} infinite={true}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <button>{item.button}</button>
          </div>
          <section>
            <img
              src={item.userProfile}
              alt={item.user}
              style={{ width: "0%" }}
            />
            <span>
              Posted by <strong>{item.user}</strong>
            </span>
          </section>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
