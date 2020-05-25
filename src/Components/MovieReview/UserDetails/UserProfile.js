/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SideMenu from "./SideMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import { page, constants, pageType } from "../../../Shared/Constants";
import { useEffect } from "react";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Information from "./../Popups/Information";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import { useSelector } from "react-redux";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { userProfileSideMenuItem } from "../../../Shared/Constants";
import UserFavoriteList from "./UserFavoriteList";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import UserFavoriteGrid from "./UserFavoriteGrid";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import UserRatedMovies from "./UserRatedMovies";

const profileState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImageUrl: "",
  createdOn: "",
};

const initialData = {
  pageNumber: 1,
  pageSize: 10,
  totalMovies: 0,
  moviesList: [],
  sortColumn: "Id",
  sortDirection: "asc",
};

const UserProfile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOkClicked, setIsOkClicked] = useState(false);
  const [profileData, setProfileData] = useState(profileState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pageViewType, setPageViewType] = useState(pageType.list);
  const [moviesList, setMoviesList] = useState(initialData.moviesList);
  const [paginationData, setPaginationData] = useState(initialData);

  const [activeSideMenuItem, setActiveSideMenuItem] = useState(
    userProfileSideMenuItem.profile
  );
  const dispatch = useDispatch();
  let isUserLoggedIn = useSelector(
    (state) => state.loggedInUserInfo.isUserLoggedIn
  );
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    const userDetails = getLocalStorageItem(constants.userDetails);
    if (userDetails) {
      dispatch(saveUserInfo(userDetails.email, true));
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
      dispatch(saveUserInfo("", false));
    }
    setIsLoading(false);
  }, [isUserLoggedIn]);

  const fetchData = () => {
    const body = {
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      sortDirection: paginationData.sortDirection,
      sortColumn: paginationData.sortColumn,
      email: profileData.email,
    };

    ServiceProvider.post(apiUrl.userFavoriteMovies, body).then((response) => {
      if (response.status === 200) {
        setMoviesList(response.data.data.details);
        setPaginationData({
          ...initialData,
          totalMovies: response.data.data.totalCount,
        });
        dispatch(toggleLoader(false, 1));
      }
    });
  };

  const handleOk = (e) => {
    debugger;
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
    if (activeSideMenuItem === userProfileSideMenuItem.favoriteMovies) {
      dispatch(toggleLoader(true, "15%"));
      fetchData();
    }
    setActiveSideMenuItem(activeSideMenuItem);
  };

  const setPageType = (moviePageType) => {
    if (moviePageType === pageType.list) {
      setPageViewType(pageType.grid);
    } else {
      setPageViewType(pageType.list);
    }
  };

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
                    changeProfileImageUrl={changeProfileImageUrl}
                    userId={profileData.userId}
                    toggleSideMenuItem={toggleSideMenuItem}
                    activeSideMenuItem={activeSideMenuItem}
                  ></SideMenu>
                  <div class="col-md-9 col-sm-12 col-xs-12">
                    {activeSideMenuItem === userProfileSideMenuItem.profile && (
                      <div class="form-style-1 user-pro" action="">
                        <ProfileDetails
                          firstName={profileData.firstName}
                          lastName={profileData.lastName}
                          email={profileData.email}
                          createdOn={profileData.createdOn}
                          userId={profileData.userId}
                        ></ProfileDetails>
                        <ChangePassword
                          email={profileData.email}
                          showInformation={showInformation}
                        ></ChangePassword>
                      </div>
                    )}
                    {activeSideMenuItem ===
                      userProfileSideMenuItem.favoriteMovies &&
                      pageViewType === pageType.list && (
                        <UserFavoriteList
                          email={profileData.email}
                          setPageType={setPageType}
                          pageViewType={pageViewType}
                          moviesList={moviesList}
                          paginationData={paginationData}
                        ></UserFavoriteList>
                      )}
                    {activeSideMenuItem ===
                      userProfileSideMenuItem.favoriteMovies &&
                      pageViewType === pageType.grid && (
                        <UserFavoriteGrid
                          email={profileData.email}
                          setPageType={setPageType}
                          pageViewType={pageViewType}
                          moviesList={moviesList}
                          paginationData={paginationData}
                        ></UserFavoriteGrid>
                      )}
                    {activeSideMenuItem ===
                      userProfileSideMenuItem.ratedMovies && (
                      <UserRatedMovies
                        email={profileData.email}
                      ></UserRatedMovies>
                    )}
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
