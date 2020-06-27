/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import Topbar from "../Common/Topbar";
import CelebrityList from "./CelebrityList";
import Header from "../Common/Header";
import LoaderProvider from "../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import "../../../css/movie-single.css";
import Pagination from "../Common/Pagination";
import {
  pageType,
  searchBarSubType,
  celebritySearchType,
} from "../../../Shared/Constants";
import CelebritySearchBox from "./CelebritySearchBox";
import { celebritySortTypeList } from "./../../../Shared/Constants";
import CelebrityGrid from "./CelebrityGrid";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl, sortColumns, sortDirection } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import NoResultFound from "../Common/NoResultFound";
import { getCelebritySearchType } from "../../../Shared/Services/SearchBoxSearchTypeService";
import { countList } from "./../../../Shared/Constants";
import Footer from "../Common/Footer";
import celebsImage from "../../../images/celebs.jpg";
import { page as celebPage } from "./../../../Shared/Constants";
import { gender } from "./../../../Shared/Constants";

const initialData = {
  totalCelebrities: 0,
  pageNumber: 1,
  pageSize: 1,
  celebrityList: [],
  sortColumn: sortColumns.celebrityName,
  sortDirection: sortDirection.asc,
};

const state = {
  celebrityName: "",
  celebrityInitial: 0,
  category: 0,
  fromBirthYear: 0,
  toBirthYear: 0,
  searchType: "",
};

const celebrityPageType = {
  pageType: pageType.list,
  showGrid: false,
};

const Celebrities = (props) => {
  const dispatch = useDispatch();
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [celebrityData, setCelebrityData] = useState(initialData);
  const [page, togglePageType] = useState(celebrityPageType);
  const [
    celebrityDetailsSearchBoxData,
    setCelebrityDetailsSearchBoxData,
  ] = useState(state);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchType = getCelebritySearchType(celebrityDetailsSearchBoxData);
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: celebrityData.pageSize,
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: celebrityDetailsSearchBoxData.celebrityName,
      celebrityInitial: celebrityDetailsSearchBoxData.celebrityInitial,
      fromBirthYear: celebrityDetailsSearchBoxData.fromBirthYear,
      toBirthYear: celebrityDetailsSearchBoxData.toBirthYear,
      gender: celebrityDetailsSearchBoxData.category,
      searchType: searchType,
    };
    fetchCelebsData(body, setCelebrityData, celebrityData, true);
  };

  const changeCelebrityCount = (e) => {
    dispatch(toggleLoader(true, "15%"));
    let hideLoader = true;

    if (e.target.value > celebrityData.pageSize) {
      hideLoader = false;
    }
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: Number(e.target.value),
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: state.celebrityName,
      celebrityInitial: state.celebrityInitial,
      fromBirthYear: state.fromBirthYear,
      toBirthYear: state.toBirthYear,
      gender: state.category,
      searchType: state.searchType,
    };
    fetchCelebsData(body, setCelebrityData, celebrityData, hideLoader);
  };

  const clearState = (e) => {
    e.preventDefault();
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: celebrityData.pageNumber,
      pageSize: celebrityData.pageSize,
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: state.celebrityName,
      celebrityInitial: state.celebrityInitial,
      fromBirthYear: state.fromBirthYear,
      toBirthYear: state.toBirthYear,
      gender: state.category,
      searchType: state.searchType,
    };
    fetchCelebsData(body, setCelebrityData, celebrityData);
  };

  const setCelebrityDetails = (e) => {
    setCelebrityDetailsSearchBoxData({
      ...celebrityDetailsSearchBoxData,
      [e.target.name]: e.target.value,
    });
  };

  const pageNumberClicked = (page) => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: page,
      pageSize: celebrityData.pageSize,
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: celebrityDetailsSearchBoxData.celebrityName,
      celebrityInitial: celebrityDetailsSearchBoxData.celebrityInitial,
      fromBirthYear: celebrityDetailsSearchBoxData.fromBirthYear,
      toBirthYear: celebrityDetailsSearchBoxData.toBirthYear,
      gender: celebrityDetailsSearchBoxData.category,
      searchType: celebrityDetailsSearchBoxData.searchType,
    };
    fetchCelebsData(body, setCelebrityData, celebrityData, false);
  };

  const fetchSortedData = (e) => {
    dispatch(toggleLoader(true, "15%"));
    let body = {
      pageNumber: celebrityData.pageNumber,
      pageSize: celebrityData.pageSize,
      sortColumn: sortColumns.celebrityName,
      celebrityName: celebrityDetailsSearchBoxData.celebrityName,
      celebrityInitial: celebrityDetailsSearchBoxData.celebrityInitial,
      fromBirthYear: celebrityDetailsSearchBoxData.fromBirthYear,
      toBirthYear: celebrityDetailsSearchBoxData.toBirthYear,
      gender: celebrityDetailsSearchBoxData.category,
      searchType: celebrityDetailsSearchBoxData.searchType,
    };
    if (e.target.value == 1) {
      body.sortColumn = sortColumns.celebrityName;
      body.sortDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      body.sortColumn = sortColumns.celebrityName;
      body.sortDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      body.sortColumn = sortColumns.birthDate;
      body.sortDirection = sortDirection.asc;
    } else if (e.target.value == 4) {
      body.sortColumn = sortColumns.birthDate;
      body.sortDirection = sortDirection.desc;
    } else if (e.target.value == 5) {
      body.sortColumn = sortColumns.netWorth;
      body.sortDirection = sortDirection.asc;
    } else {
      body.sortColumn = sortColumns.netWorth;
      body.sortDirection = sortDirection.desc;
    }
    fetchCelebsData(body, setCelebrityData, celebrityData, true);
  };

  useEffect(() => {
    dispatch(toggleLoader(true, 0));

    const body = {
      pageNumber: celebrityData.pageNumber,
      pageSize: celebrityData.pageSize,
      sortColumn: celebrityData.sortColumn,
      sortDirection: celebrityData.sortDirection,
      celebrityName: celebrityDetailsSearchBoxData.celebrityName,
      celebrityInitial: celebrityDetailsSearchBoxData.celebrityInitial,
      fromBirthYear: celebrityDetailsSearchBoxData.fromBirthYear,
      toBirthYear: celebrityDetailsSearchBoxData.toBirthYear,
      gender: celebrityDetailsSearchBoxData.category,
      searchType: celebrityDetailsSearchBoxData.searchType,
    };

    if (props.location.isFromSlider) {
      body.sortDirection = sortDirection.desc;
      body.sortColumn = sortColumns.netWorth;
      body.gender = props.location.category;
      body.searchType = celebritySearchType.gender;
    }

    fetchCelebsData(body, setCelebrityData, celebrityData, true);
  }, []);

  const fetchCelebsData = (
    body,
    setCelebrityData,
    celebrityData,
    hideloader
  ) => {
    debugger;
    ServiceProvider.post(apiUrl.celebrities, body).then((response) => {
      if (response.status === 200) {
        setCelebrityData({
          ...celebrityData,
          totalCelebrities: response.data.data.totalCount,
          celebrityList: response.data.data.details,
          pageNumber: body.pageNumber,
          pageSize: body.pageSize,
          sortColumn: body.sortColumn,
          sortDirection: body.sortDirection,
        });
        setCelebrityDetailsSearchBoxData({
          ...celebrityDetailsSearchBoxData,
          searchType: body.searchType,
          celebrityName: body.celebrityName,
          celebrityInitial: body.celebrityInitial,
          category: body.gender,
          fromBirthYear: body.fromBirthYear,
          toBirthYear: body.toBirthYear,
        });
        if (!hideloader) {
          setIsImageLoading(true);
        } else {
          setIsImageLoading(false);
          dispatch(toggleLoader(false, 1));
        }
      }
    });
  };

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
        <div id="loader">{showLoader && <LoaderProvider></LoaderProvider>}</div>
      </div>

      <div
        style={{
          opacity: screenOpacity,
          backgroundColor: "#020d18",
        }}
      >
        <Header page={celebPage.details}></Header>
        <div
          className="hero hero3"
          style={{
            background: `url(${celebsImage}) no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="celeb-container">
            <div className="row">
              <div className="col-md-12">
                <div class="hero-ct">
                  <h1> Celeb listing - {page.showGrid ? "grid" : "list"}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  isFromSlider={props.location.isFromSlider}
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
                            isImageLoading={isImageLoading}
                          ></CelebrityList>
                        }
                      </div>
                    )}
                    {page.showGrid && (
                      <CelebrityGrid
                        celebs={celebrityData.celebrityList}
                        isImageLoading={isImageLoading}
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
                    countList={countList}
                  ></Pagination>
                )}
              </div>
              <div class="col-md-4 col-xs-12 col-sm-12">
                <CelebritySearchBox
                  handleSubmit={handleSubmit}
                  setCelebrityDetails={setCelebrityDetails}
                  celebrityDetails={celebrityDetailsSearchBoxData}
                  clearState={clearState}
                ></CelebritySearchBox>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default Celebrities;
