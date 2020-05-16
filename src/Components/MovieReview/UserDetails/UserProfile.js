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

const profileState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImageUrl: "",
};

const UserProfile = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [profileData, setProfileData] = useState(profileState);
  useEffect(() => {
    const userDetails = getLocalStorageItem(constants.userDetails);
    debugger;
    if (userDetails) {
      setIsUserLoggedIn(true);
      setProfileData({
        ...profileData,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        profileImageUrl: userDetails.profileImageUrl,
      });
      // setFirstName(userDetails.firstName);
      // if (userDetails.lastName) {
      //   setLastName(userDetails.lastName);
      // }
    } else {
      setIsUserLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  const handleOk = (e) => {
    e.preventDefault();
    setIsOkClicked(true);
  };

  if (isOkClicked) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <React.Fragment>
      <div className="background">
        {!isUserLoggedIn && !isLoading ? (
          <Information
            handleOk={handleOk}
            title={"Log In"}
            content={"Please Login To Continue"}
            loginPopupClassName={"openform"}
            handleClose={handleOk}
          ></Information>
        ) : (
          <React.Fragment>
            <Header page={page.details}></Header>
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
                      <ChangePassword></ChangePassword>
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
