/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React from "react";
import { useState } from "react";
import Topbar from "./../Common/Topbar";
import UserFavoriteList from "./UserFavoriteList";
import NoResultFound from "./../Common/NoResultFound";
import Pagination from "../Common/Pagination";
import {
  pageType,
  movieSortTypeList,
  sortColumns,
  sortDirection,
  constants,
} from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { countList } from "./../../../Shared/Constants";
import { useEffect } from "react";
import UserFavoriteGrid from "./UserFavoriteGrid";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import { useSelector } from "react-redux";
import { removeLocalStorageItem } from "../../../Provider/LocalStorageProvider";

const initialData = {
  pageNumber: 1,
  pageSize: 1,
  totalMovies: 0,
  moviesList: [],
  sortColumn: sortColumns.movieName,
  sortDirection: sortDirection.asc,
};

const UserFavorite = (props) => {
  const [moviesList, setMoviesList] = useState(initialData.moviesList);
  const [paginationData, setPaginationData] = useState(initialData);
  const [pageViewType, setPageViewType] = useState(pageType.list);
  const [isImageLoaded, setIsImageLoading] = useState(false);
  const dispatch = useDispatch();
  let isUserLoggedIn = useSelector(
    (state) => state.loggedInUserInfo.isUserLoggedIn
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(toggleLoader(true, "15%"));
      fetchData(true);
    }
  }, [isUserLoggedIn]);

  const fetchSortedData = (e) => {
    dispatch(toggleLoader(true, "15%"));
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: paginationData.pageSize,
      sortDirection: sortByDirection,
      sortColumn: sortColumn,
      email: props.email,
    };

    getUserFavoriteMovies(
      body,
      setMoviesList,
      setPaginationData,
      setIsImageLoading
    );
  };

  const getUserFavoriteMovies = (
    body,
    setMoviesList,
    setPaginationData,
    setIsImageLoading,
    hideLoader
  ) => {
    ServiceProvider.post(apiUrl.userFavoriteMovies, body).then((response) => {
      if (response.status === 200) {
        setMoviesList(response.data.data.details);
        setPaginationData({
          ...initialData,
          totalMovies: response.data.data.totalCount,
          pageNumber: body.pageNumber,
          pageSize: body.pageSize,
          sortColumn: body.sortColumn,
          sortDirection: body.sortDirection,
        });
        if (hideLoader && response.data.data.totalCount !== 0) {
          setIsImageLoading(true);
        } else {
          setIsImageLoading(false);
          dispatch(toggleLoader(false, 1));
        }
      } else if (response.status === 401) {
        dispatch(toggleLoader(false, 1));
        dispatch(saveUserInfo("", false, true));
        removeLocalStorageItem(constants.userDetails);
      }
    });
  };

  const getSortingDetails = (e) => {
    let sortColumn = "",
      sortByDirection = "";
    if (e.target.value == 1) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 4) {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 5) {
      sortColumn = sortColumns.releaseDate;
      sortByDirection = sortDirection.asc;
    } else {
      sortColumn = sortColumns.releaseDate;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  const setPageType = (moviePageType) => {
    if (moviePageType === pageType.grid) {
      setPageViewType(pageType.grid);
    } else {
      setPageViewType(pageType.list);
    }
  };

  const pageNumberClicked = (page) => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: page,
      pageSize: paginationData.pageSize,
      sortDirection: paginationData.sortDirection,
      sortColumn: paginationData.sortColumn,
      email: props.email,
    };

    getUserFavoriteMovies(
      body,
      setMoviesList,
      setPaginationData,
      setIsImageLoading
    );
  };

  const changeMovieCount = (e) => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: e.target.value,
      sortDirection: paginationData.sortDirection,
      sortColumn: paginationData.sortColumn,
      email: props.email,
    };

    getUserFavoriteMovies(
      body,
      setMoviesList,
      setPaginationData,
      setIsImageLoading
    );
  };

  const fetchData = (hideLoader) => {
    const body = {
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      sortDirection: paginationData.sortDirection,
      sortColumn: paginationData.sortColumn,
      email: props.email,
    };

    getUserFavoriteMovies(
      body,
      setMoviesList,
      setPaginationData,
      setIsImageLoading,
      hideLoader
    );
  };

  return (
    <React.Fragment>
      <Topbar
        totalCount={paginationData.totalMovies}
        pageType={pageViewType}
        fetchSortedData={fetchSortedData}
        setPageType={setPageType}
        sortBylist={movieSortTypeList}
      ></Topbar>
      {moviesList.length === 0 ? (
        <NoResultFound></NoResultFound>
      ) : (
        <React.Fragment>
          {pageViewType === pageType.list && (
            <UserFavoriteList
              moviesList={moviesList}
              isImageLoaded={isImageLoaded}
            ></UserFavoriteList>
          )}
          {pageViewType === pageType.grid && (
            <UserFavoriteGrid
              moviesList={moviesList}
              isImageLoaded={isImageLoaded}
            ></UserFavoriteGrid>
          )}
        </React.Fragment>
      )}
      {moviesList.length > 0 && (
        <Pagination
          pageSize={paginationData.pageSize}
          totalCount={paginationData.totalMovies}
          currentPage={paginationData.pageNumber}
          changeCount={changeMovieCount}
          pageNumberClicked={pageNumberClicked}
          countList={countList}
          description="Movies"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserFavorite;
