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

const SideMenu = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(togglePopup("openform", popupType.logout));
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
            <li class="active">
              <a
                onClick={() =>
                  props.toggleSideMenuItem(userProfileSideMenuItem.profile)
                }
              >
                Profile
              </a>
            </li>
            <li>
              <a
                onClick={() =>
                  props.toggleSideMenuItem(
                    userProfileSideMenuItem.favoriteMovies
                  )
                }
                className="white-pointer"
              >
                Favorite movies
              </a>
            </li>
            <li>
              <a href="userrate.html" className="white-pointer">
                Rated movies
              </a>
            </li>
          </ul>
        </div>
        <div class="user-fav">
          <p>Others</p>
          <ul>
            <li>
              <a href="#">Change password</a>
            </li>
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
