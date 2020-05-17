/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SideMenu from "./SideMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import { page, constants } from "../../../Shared/Constants";
import { useEffect } from "react";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Information from "./../Popups/Information";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import { useSelector } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";

const profileState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImageUrl: "",
};

let userDetails = {};
const UserProfile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [profileData, setProfileData] = useState(profileState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  let isUserLoggedIn = useSelector(
    (state) => state.loggedInUserInfo.isUserLoggedIn
  );
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    userDetails = getLocalStorageItem(constants.userDetails);
    if (userDetails) {
      dispatch(saveUserInfo(userDetails.email, true));
      setProfileData({
        ...profileData,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        profileImageUrl: userDetails.profileImageUrl,
      });
    } else {
      dispatch(saveUserInfo("", false));
    }
    setIsLoading(false);
  }, [isUserLoggedIn]);

  const handleOk = (e) => {
    debugger;
    e.preventDefault();
    setIsOkClicked(true);
  };

  const showInformation = (informationTitle, informationContent) => {
    debugger;
    setTitle(informationTitle);
    setContent(informationContent);
  };
  if (isOkClicked) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">
          {showLoader && <LoaderProvider visible={showLoader}></LoaderProvider>}
        </div>
      </div>
      <div className="background" style={{ opacity: screenOpacity }}>
        {!isUserLoggedIn && !isLoading ? (
          <Information
            title={"Log In"}
            content={"Please Login To Continue"}
            loginPopupClassName={"openform"}
            closePopup={handleOk}
          ></Information>
        ) : (
          <React.Fragment>
            <Header
              page={page.details}
              handleOk={handleOk}
              informationTitle={title}
              informationContent={content}
            ></Header>
            <div class="hero user-hero">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="hero-ct">
                      <h1>
                        {profileData.firstName} {""} {profileData.lastName}’s
                        profile
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-single">
              <div class="container">
                <div class="row ipad-width">
                  <SideMenu
                    profileImageUrl={profileData.profileImageUrl}
                  ></SideMenu>
                  <div class="col-md-9 col-sm-12 col-xs-12">
                    <div class="form-style-1 user-pro" action="">
                      <ProfileDetails
                        firstName={profileData.firstName}
                        lastName={profileData.lastName}
                        email={profileData.email}
                      ></ProfileDetails>
                      {userDetails.email && (
                        <ChangePassword
                          email={userDetails.email}
                          showInformation={showInformation}
                        ></ChangePassword>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
