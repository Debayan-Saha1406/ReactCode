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
import { pageType, celebCountList } from "../../../Shared/Constants";
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

const initialData = {
  totalCelebrities: 0,
  pageNumber: 1,
  pageSize: 20,
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

const Celebrities = () => {
  const dispatch = useDispatch();
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [celebrityData, setCelebrityData] = useState(initialData);
  const [page, togglePageType] = useState(celebrityPageType);
  const [
    celebrityDetailsSearchBoxData,
    setCelebrityDetailsSearchBoxData,
  ] = useState(state);

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
    fetchCelebsData(body, setCelebrityData, celebrityData);
  };

  const changeCelebrityCount = (e) => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: celebrityData.pageNumber,
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
    fetchCelebsData(body, setCelebrityData, celebrityData);
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
    fetchCelebsData(body, setCelebrityData, celebrityData);
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
      body.sortDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      body.sortDirection = sortDirection.desc;
    }
    fetchCelebsData(body, setCelebrityData, celebrityData);
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
    fetchCelebsData(body, setCelebrityData, celebrityData);
  }, []);

  const fetchCelebsData = (body, setCelebrityData, celebrityData) => {
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
        dispatch(toggleLoader(false, 1));
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
      </div>
    </React.Fragment>
  );
};

export default Celebrities;
