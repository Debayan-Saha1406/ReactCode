import React, { useState } from "react";
import Topbar from "../Common/Topbar";
import CelebrityList from "./List";
import Header from "../Common/Header";
import LoaderProvider from "../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import "../../../css/movie-single.css";
//import "../../../css/home.css";
import Pagination from "../Common/Pagination";
import Searchbox from "./../Common/Searchbox";
import { pageType } from "../../../Shared/Constants";
import CelebritySearchBox from "./CelebritySearchBox";

const initialData = {
  totalCelebrities: 0,
  pageNumber: 1,
  pageSize: 10,
  celebrityList: [],
};

const celebrityPageType = {
  pageType: pageType.list,
  showGrid: false,
};

const Celebrities = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [celebrityData, setCelebirtyData] = useState(initialData);
  const [page, togglePageType] = useState(celebrityPageType);

  const changeCelebrityCount = () => {};

  const pageNumberClicked = () => {};
  const getFilteredMovies = () => {};

  const fetchInitialData = () => {};
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
              <div class="col-md-9 col-sm-12 col-xs-12">
                <Topbar
                  totalCount={celebrityData.totalCelebrities}
                  pageType={celebrityPageType.pageType}
                  fetchSortedData={fetchSortedData}
                  setPageType={setPageType}
                ></Topbar>
                <div className="row">
                  {!page.showGrid && <CelebrityList></CelebrityList>}
                </div>
                <Pagination
                  pageSize={celebrityData.pageSize}
                  totalCount={celebrityData.totalCelebrities}
                  currentPage={celebrityData.pageNumber}
                  changeCount={changeCelebrityCount}
                  pageNumberClicked={pageNumberClicked}
                  description="Movies"
                ></Pagination>
              </div>
              <div class="col-md-3 col-xs-12 col-sm-12">
                <CelebritySearchBox></CelebritySearchBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Celebrities;
