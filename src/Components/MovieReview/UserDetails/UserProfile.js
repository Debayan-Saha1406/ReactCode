/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SideMenu from "./SideMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import { page, constants } from "../../../Shared/Constants";
import { useEffect } from "react";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./../../../Provider/LocalStorageProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Information from "./../Popups/Information";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import { useSelector } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { userProfileSideMenuItem } from "../../../Shared/Constants";
import UserRatedMovies from "./UserRatedMovies";
import UserFavorite from "./UserFavorite";
import Footer from "../Common/Footer";
import NetworkDetector from "../Common/NetworkDetector";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import UserReviewedMovies from "./UserReviewedMovies";

const profileState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImageUrl: "",
  createdOn: "",
};

const UserProfile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [profileData, setProfileData] = useState(profileState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeSideMenuItem, setActiveSideMenuItem] = useState(
    userProfileSideMenuItem.profile
  );
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(
    (state) => state.loggedInUserInfo.isUserLoggedIn
  );

  const hasSessionTimedOut = useSelector(
    (state) => state.loggedInUserInfo.hasSessionTimedOut
  );
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    const userDetails = getLocalStorageItem(constants.userDetails);
    if (userDetails) {
      dispatch(saveUserInfo(userDetails.email, true, false));
      setProfileData({
        ...profileData,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        profileImageUrl: userDetails.profileImageUrl,
        createdOn: userDetails.createdOn,
        userId: userDetails.userId,
      });
    } else {
      if (hasSessionTimedOut) {
        dispatch(saveUserInfo("", false, true));
      } else {
        dispatch(saveUserInfo("", false));
      }
    }
    setIsLoading(false);
  }, [isUserLoggedIn]);

  const handleOk = (e) => {
    e.preventDefault();
    setIsOkClicked(true);
  };

  const showInformation = (informationTitle, informationContent) => {
    setTitle(informationTitle);
    setContent(informationContent);
  };

  if (isOkClicked) {
    return <Redirect to="/home"></Redirect>;
  }

  const changeProfileImageUrl = (image) => {
    setProfileData({
      ...profileData,
      profileImageUrl: image,
    });
  };

  const toggleSideMenuItem = (activeSideMenuItem) => {
    setActiveSideMenuItem(activeSideMenuItem);
  };

  const sendUpdateRequest = (firstName, lastName) => {
    if (!firstName.isErrorExist) {
      dispatch(toggleLoader(true, "15%"));
      const body = {
        firstName: firstName.value,
        lastName: lastName.value,
      };
      ServiceProvider.put(apiUrl.userInfo, profileData.userId, body).then(
        (response) => {
          if (response.status === 200) {
            dispatch(toggleLoader(false, 1));
            const userDetails = getLocalStorageItem(constants.userDetails);
            userDetails.firstName = firstName.value;
            userDetails.lastName = lastName.value;

            setLocalStorageItem(constants.userDetails, userDetails);
            setProfileData({
              ...profileData,
              firstName: userDetails.firstName,
              lastName: userDetails.lastName,
            });
          } else if (response.status === 401) {
            removeLocalStorageItem(constants.userDetails);
            dispatch(toggleLoader(false, 1));
            dispatch(saveUserInfo("", false, true));
          } else {
            showErrorMessage(response.data.errors);
            dispatch(toggleLoader(false, 1));
          }
        }
      );
    }
  };

  return (
    <React.Fragment>
      {!isUserLoggedIn && !isLoading ? (
        <Information
          title={"Log In"}
          content={
            hasSessionTimedOut
              ? "Your session has timed out. Please Login To Continue"
              : "Please Login To Continue"
          }
          popupClassName={"openform"}
          closePopup={handleOk}
          btnText="Ok"
        ></Information>
      ) : (
        <React.Fragment>
          <div id="loaderContainer">
            <div id="loader">
              {showLoader && (
                <LoaderProvider visible={showLoader}></LoaderProvider>
              )}
            </div>
          </div>
          <div className="background" style={{ opacity: screenOpacity }}>
            <React.Fragment>
              <Header
                page={page.details}
                handleOk={handleOk}
                informationTitle={title}
                informationContent={content}
              ></Header>
              <div className="hero user-hero">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-ct">
                        <h1>
                          {profileData.firstName} {""} {profileData.lastName}’s
                          profile
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-single">
                <div className="container">
                  <div className="row ipad-width">
                    <SideMenu
                      profileImageUrl={profileData.profileImageUrl}
                      changeProfileImageUrl={changeProfileImageUrl}
                      userId={profileData.userId}
                      toggleSideMenuItem={toggleSideMenuItem}
                      activeSideMenuItem={activeSideMenuItem}
                    ></SideMenu>
                    <div className="col-md-9 col-sm-12 col-xs-12">
                      {activeSideMenuItem ===
                        userProfileSideMenuItem.profile && (
                        <div className="form-style-1 user-pro" action="">
                          <ProfileDetails
                            firstName={profileData.firstName}
                            lastName={profileData.lastName}
                            email={profileData.email}
                            createdOn={profileData.createdOn}
                            userId={profileData.userId}
                            sendUpdateRequest={sendUpdateRequest}
                          ></ProfileDetails>
                          <ChangePassword
                            email={profileData.email}
                            showInformation={showInformation}
                          ></ChangePassword>
                        </div>
                      )}
                      {activeSideMenuItem ===
                        userProfileSideMenuItem.favoriteMovies && (
                        <UserFavorite email={profileData.email}></UserFavorite>
                      )}
                      {activeSideMenuItem ===
                        userProfileSideMenuItem.ratedMovies && (
                        <UserRatedMovies
                          email={profileData.email}
                        ></UserRatedMovies>
                      )}

                      {activeSideMenuItem ===
                        userProfileSideMenuItem.reviewedMovies && (
                        <UserReviewedMovies
                          email={profileData.email}
                        ></UserReviewedMovies>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Footer></Footer>
            </React.Fragment>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NetworkDetector(UserProfile);
