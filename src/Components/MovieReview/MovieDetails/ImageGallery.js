/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import windowSize from "react-window-size";
import Gallery from "../Common/Gallery";

const ImageGallery = (props) => {
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
    <Gallery
      currentImage={currentImage}
      nextButtonVisibility={nextButtonVisibility}
      previousButtonVisibility={previousButtonVisibility}
      showloader={showloader}
      opacity={opacity}
      galleryImages={galleryImages}
      setNextButtonVisibility={setNextButtonVisibility}
      setPreviousButtonVisibility={setPreviousButtonVisibility}
      handleImageLoad={handleImageLoad}
      changeVisibility={changeVisibility}
      fetchNextImage={fetchNextImage}
      fetchPreviousImage={fetchPreviousImage}
      closeGallery={props.closeGallery}
    ></Gallery>
  );
};

export default windowSize(ImageGallery);
