/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Topbar from "../Common/Topbar";
import CelebrityList from "./CelebrityList";
import Header from "../Common/Header";
import LoaderProvider from "../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import "../../../css/movie-single.css";
//import "../../../css/home.css";
import Pagination from "../Common/Pagination";
import Searchbox from "./../Common/Searchbox";
import { pageType, celebritySearchType } from "../../../Shared/Constants";
import CelebritySearchBox from "./CelebritySearchBox";
import { celebritySortTypeList } from "./../../../Shared/Constants";
import CelebrityGrid from "./CelebrityGrid";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import {
  apiUrl,
  sortColumns,
  sortDirection,
  movieSortTypeList,
} from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import NoResultFound from "../Common/NoResultFound";

const initialData = {
  totalCelebrities: 0,
  pageNumber: 1,
  pageSize: 10,
  celebrityList: [],
  sortColumn: sortColumns.celebrityName,
  sortDirection: sortDirection.asc,
};

const celebrityPageType = {
  pageType: pageType.list,
  showGrid: false,
};

const Celebrities = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [celebrityData, setCelebrityData] = useState(initialData);
  const [page, togglePageType] = useState(celebrityPageType);
  const dispatch = useDispatch();

  const handleSubmit = (e, celebDetails) => {
    e.preventDefault();
    let searchType = "";
    if (
      celebDetails.celebrityName &&
      celebDetails.celebrityInitial != 0 &&
      celebDetails.category != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityNameInitialGenderBirthYear;
    } else if (
      celebDetails.celebrityName &&
      celebDetails.celebrityInitial != 0 &&
      celebDetails.category != 0
    ) {
      searchType = celebritySearchType.celebrityNameInitialGender;
    } else if (
      celebDetails.celebrityName &&
      (celebDetails.celebrityInitial != 0) != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityNameInitialBirthYear;
    } else if (
      celebDetails.celebrityName &&
      celebDetails.celebrityInitial != 0
    ) {
      searchType = celebritySearchType.celebrityNameInitial;
    } else if (
      celebDetails.celebrityName &&
      celebDetails.category != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityNameGenderBirthYear;
    } else if (celebDetails.celebrityName && celebDetails.category != 0) {
      searchType = celebritySearchType.celebrityNameGender;
    } else if (
      celebDetails.celebrityInitial != 0 &&
      celebDetails.category != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityInitialGenderBirthYear;
    } else if (
      celebDetails.celebrityInitial != 0 &&
      celebDetails.category != 0
    ) {
      searchType = celebritySearchType.celebrityInitialGender;
    } else if (
      celebDetails.celebrityName &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityNameBirthYear;
    } else if (
      celebDetails.celebrityInitial != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.celebrityInitialBirthYear;
    } else if (
      celebDetails.category != 0 &&
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.genderBirthYear;
    } else if (celebDetails.celebrityName) {
      searchType = celebritySearchType.celebrityName;
    } else if (celebDetails.celebrityInitial != 0) {
      searchType = celebritySearchType.celebrityInitial;
    } else if (
      celebDetails.fromBirthYear != 0 &&
      celebDetails.toBirthYear != 0
    ) {
      searchType = celebritySearchType.birthYear;
    } else if (celebDetails.category != 0) {
      searchType = celebritySearchType.gender;
    }
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: celebrityData.pageNumber,
      pageSize: celebrityData.pageSize,
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: celebDetails.celebrityName,
      celebrityInitial: celebDetails.celebrityInitial,
      fromBirthYear: celebDetails.fromBirthYear,
      toBirthYear: celebDetails.toBirthYear,
      gender: celebDetails.category,
      searchType: searchType,
    };
    ServiceProvider.post(apiUrl.celebrities, body).then((response) => {
      if (response.status === 200) {
        setCelebrityData({
          ...celebrityData,
          totalCelebrities: response.data.data.totalCount,
          celebrityList: response.data.data.details,
        });
        dispatch(toggleLoader(false, 1));
      }
    });
  };

  const changeCelebrityCount = () => {};
  const fetchInitialData = (screenOpacity) => {
    dispatch(toggleLoader(true, screenOpacity));
    fetchCelebsData(celebrityData, setCelebrityData, dispatch);
  };
  const pageNumberClicked = () => {};
  const getFilteredMovies = () => {};

  useEffect(() => {
    dispatch(toggleLoader(true, 0));
    fetchCelebsData(celebrityData, setCelebrityData, dispatch);
  }, []);
  const fetchSortedData = () => {};

  const setPageType = (celebrityPageType) => {
    if (celebrityPageType === pageType.grid) {
      togglePageType({
        ...celebrityPageType,
        pageType: pageType.grid,
        showGrid: true,
      });
    } else {
      togglePageType({
        ...celebrityPageType,
        pageType: pageType.list,
        showGrid: false,
      });
    }
  };
  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">
          {showLoader && <LoaderProvider visible={showLoader}></LoaderProvider>}
        </div>
      </div>

      <div
        className="background"
        style={{
          opacity: screenOpacity,
        }}
      >
        <Header></Header>
        <div class="page-single">
          <div class="container">
            <div class="row ipad-width2">
              <div class="col-md-8 col-sm-12 col-xs-12">
                <Topbar
                  totalCount={celebrityData.totalCelebrities}
                  pageType={page.pageType}
                  fetchSortedData={fetchSortedData}
                  setPageType={setPageType}
                  sortBylist={celebritySortTypeList}
                ></Topbar>
                {celebrityData.celebrityList.length === 0 ? (
                  <NoResultFound></NoResultFound>
                ) : (
                  <React.Fragment>
                    {!page.showGrid && (
                      <div className="row">
                        {
                          <CelebrityList
                            celebs={celebrityData.celebrityList}
                          ></CelebrityList>
                        }
                      </div>
                    )}
                    {page.showGrid && (
                      <CelebrityGrid
                        celebs={celebrityData.celebrityList}
                      ></CelebrityGrid>
                    )}
                  </React.Fragment>
                )}

                {celebrityData.celebrityList.length > 0 && (
                  <Pagination
                    pageSize={celebrityData.pageSize}
                    totalCount={celebrityData.totalCelebrities}
                    currentPage={celebrityData.pageNumber}
                    changeCount={changeCelebrityCount}
                    pageNumberClicked={pageNumberClicked}
                    description="Celebs"
                  ></Pagination>
                )}
              </div>
              <div class="col-md-4 col-xs-12 col-sm-12">
                <CelebritySearchBox
                  handleSubmit={handleSubmit}
                  fetchInitialData={fetchInitialData}
                ></CelebritySearchBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Celebrities;
function fetchCelebsData(celebrityData, setCelebrityData, dispatch) {
  const body = {
    pageNumber: celebrityData.pageNumber,
    pageSize: celebrityData.pageSize,
    sortColumn: celebrityData.sortColumn,
    sortDirection: celebrityData.sortDirection,
  };
  ServiceProvider.post(apiUrl.celebrities, body).then((response) => {
    if (response.status === 200) {
      setCelebrityData({
        ...celebrityData,
        totalCelebrities: response.data.data.totalCount,
        celebrityList: response.data.data.details,
      });
      dispatch(toggleLoader(false, 1));
    }
  });
}
