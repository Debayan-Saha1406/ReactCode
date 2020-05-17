/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch } from "react-redux";
import { togglePopup } from "./../../../Store/Actions/actionCreator";
import { popupType } from "./../../../Shared/Constants";
import "../../../css/movie-single.css";

const SideMenu = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(togglePopup("openform", popupType.logout));
  };
  return (
    <div class="col-md-3 col-sm-12 col-xs-12">
      <div class="user-information">
        <div class="user-img">
          <a>
            <img src={props.profileImageUrl} alt="" />
            <br />
          </a>
          <a class="redbtn" id="black-hover" style={{ cursor: "pointer" }}>
            Change avatar
          </a>
        </div>
        <div class="user-fav">
          <p>Account Details</p>
          <ul>
            <li class="active">
              <a href="userprofile.html">Profile</a>
            </li>
            <li>
              <a href="userfavoritelist.html">Favorite movies</a>
            </li>
            <li>
              <a href="userrate.html">Rated movies</a>
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
