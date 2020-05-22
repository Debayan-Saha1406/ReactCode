/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch } from "react-redux";
import { togglePopup } from "./../../../Store/Actions/actionCreator";
import {
  popupType,
  constants,
  userProfileSideMenuItem,
} from "./../../../Shared/Constants";
import "../../../css/movie-single.css";
import { ImagePickerProvider } from "./../../../Provider/ImagePickerProvider";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { useState } from "react";

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const [activeSideMenuItem, setActiveSideMenuItem] = useState(
    userProfileSideMenuItem.profile
  );

  const logout = () => {
    dispatch(togglePopup("openform", popupType.logout));
  };

  const toggleSideMenuItem = (activeSideMenu) => {
    if (activeSideMenuItem !== activeSideMenu) {
      setActiveSideMenuItem(activeSideMenu);
      props.toggleSideMenuItem(activeSideMenu);
    }
  };

  const handleFileChange = (image) => {
    const userDetails = getLocalStorageItem(constants.userDetails);
    if (userDetails !== null) {
      props.changeProfileImageUrl(image);
      userDetails.profileImageUrl = image;
      setLocalStorageItem(constants.userDetails, userDetails);
      updateRequest(image, dispatch, props);
    }
  };

  const updateRequest = (image, dispatch, props) => {
    const body = {
      image: image,
    };
    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.put(apiUrl.profileImage, props.userId, body).then(
      (response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
        } else {
          showErrorMessage(response.data.errors);
          dispatch(toggleLoader(false, 1));
        }
      }
    );
  };

  const handleIncorrectFileFormat = (errMsg) => {
    showErrorMessage(errMsg);
  };

  return (
    <div class="col-md-3 col-sm-12 col-xs-12">
      <div class="user-information">
        <div class="user-img">
          <a>
            <img src={props.profileImageUrl} alt="" />
            <br />
          </a>
          <ImagePickerProvider
            handleFileChange={(image) => handleFileChange(image)}
            handleIncorrectFileFormat={(errMsg) =>
              handleIncorrectFileFormat(errMsg)
            }
            fileComponent={
              <a class="redbtn" id="black-hover" style={{ cursor: "pointer" }}>
                Change avatar
              </a>
            }
          ></ImagePickerProvider>
        </div>
        <div class="user-fav">
          <p>Account Details</p>
          <ul>
            {activeSideMenuItem === userProfileSideMenuItem.profile ? (
              <li className="active">
                <a
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.profile)
                  }
                >
                  Profile
                </a>
              </li>
            ) : (
              <li>
                <a
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.profile)
                  }
                  className="white-pointer"
                >
                  Profile
                </a>
              </li>
            )}
            {activeSideMenuItem === userProfileSideMenuItem.favoriteMovies ? (
              <li className="active">
                <a
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.favoriteMovies)
                  }
                >
                  Favorite movies
                </a>
              </li>
            ) : (
              <li>
                <a
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.favoriteMovies)
                  }
                  className="white-pointer"
                >
                  Favorite movies
                </a>
              </li>
            )}
            {activeSideMenuItem === userProfileSideMenuItem.ratedMovies ? (
              <li className="active">
                <a
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.ratedMovies)
                  }
                >
                  Rated movies
                </a>
              </li>
            ) : (
              <li>
                <a
                  className="white-pointer"
                  onClick={() =>
                    toggleSideMenuItem(userProfileSideMenuItem.ratedMovies)
                  }
                >
                  Rated movies
                </a>
              </li>
            )}
          </ul>
        </div>
        <div class="user-fav">
          <p>Others</p>
          <ul>
            <li>
              <a onClick={logout} className="white-pointer">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
