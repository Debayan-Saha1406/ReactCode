/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SideMenu from "./SideMenu";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import { page } from "../../../Shared/Constants";

const UserProfile = () => {
  return (
    <React.Fragment>
      <div className="background">
        <Header page={page.details}></Header>
        <div class="hero user-hero">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="hero-ct">
                  <h1>Edward kennedy’s profile</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-single">
          <div class="container">
            <div class="row ipad-width">
              <SideMenu></SideMenu>
              <div class="col-md-9 col-sm-12 col-xs-12">
                <div class="form-style-1 user-pro" action="">
                  <ProfileDetails></ProfileDetails>
                  <ChangePassword></ChangePassword>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
