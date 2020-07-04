/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import Header from "./../Common/Header";
import directorImage from "../../../images/directors.jpg";

import "../../../css/movie-single.css";
import {
  sortColumns,
  sortDirection,
  countList,
} from "./../../../Shared/Constants";
import { useState } from "react";
import Topbar from "./../Common/Topbar";
import { pageType } from "./../../../Shared/Constants";
import { directorSortTypeList } from "./../../../Shared/Constants";
import NoResultFound from "./../Common/NoResultFound";
import DirectorList from "./DirectorList";
import DirectorGrid from "./DirectorGrid";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import Pagination from "../Common/Pagination";
import DirectorSearchBox from "./DirectorSearchBox";
import Footer from "./../Common/Footer";
import { page as directorPage } from "./../../../Shared/Constants";
import NetworkDetector from "../Common/NetworkDetector";

const initialData = {
  totalDirectors: 0,
  pageNumber: 1,
  pageSize: 1,
  sortColumn: sortColumns.directorName,
  sortDirection: sortDirection.asc,
};

const directorPageType = {
  pageType: pageType.list,
  showGrid: false,
};

const Directors = (props) => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [paginationData, setPaginationData] = useState(initialData);
  const [directorList, setDirectorList] = useState([]);
  const dispatch = useDispatch();
  const [page, togglePageType] = useState(directorPageType);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [directorName, setDirectorName] = useState("");
  const [isInitialDataFetch, setIsInitialDataFetch] = useState(true);

  const changeCelebrityCount = (e) => {
    setPaginationData({
      ...paginationData,
      pageNumber: initialData.pageNumber,
      pageSize: Number(e.target.value),
    });
    if (e.target.value > paginationData.pageSize) {
      setIsImageLoading(true);
    } else {
      setIsImageLoading(false);
    }
  };

  const clearState = (e) => {
    e.preventDefault();
    setDirectorName("");
    setPaginationData({
      ...paginationData,
      pageNumber: initialData.pageNumber,
      pageSize: paginationData.pageSize,
      sortColumn: paginationData.sortColumn,
      sortDirection: paginationData.sortDirection,
    });
    setIsImageLoading(false);
  };

  const pageNumberClicked = (page) => {
    setPaginationData({
      ...paginationData,
      pageNumber: page,
    });
    setIsImageLoading(true);
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    setPaginationData({
      ...paginationData,
      sortColumn: sortColumn,
      sortDirection: sortByDirection,
    });
    setIsImageLoading(false);
  };

  const getSortingDetails = (e) => {
    dispatch(toggleLoader(true, "15%"));
    let sortColumn = "",
      sortByDirection = "";
    if (e.target.value == 1) {
      sortColumn = sortColumns.directorName;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      sortColumn = sortColumns.directorName;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      sortColumn = sortColumns.birthDate;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 4) {
      sortColumn = sortColumns.birthDate;
      sortByDirection = sortDirection.desc;
    } else {
      sortColumn = sortColumns.topDirectors;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  const handleSubmit = (e, name) => {
    e.preventDefault();
    setDirectorName(name);
    setIsImageLoading(false);
  };

  useEffect(() => {
    if (isInitialDataFetch) {
      dispatch(toggleLoader(true, 0));
      setIsInitialDataFetch(false);
    } else {
      dispatch(toggleLoader(true, "15%"));
    }

    const body = {
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      sortColumn: paginationData.sortColumn,
      sortDirection: paginationData.sortDirection,
      directorName: directorName,
    };

    if (props.location.isFromDirectorSlide) {
      body.sortDirection = sortDirection.desc;
      body.sortColumn = sortColumns.topDirectors;
    }

    ServiceProvider.post(apiUrl.directors, body).then((response) => {
      if (response.status === 200) {
        setDirectorList(response.data.data.details);
        setPaginationData({
          ...paginationData,
          totalDirectors: response.data.data.totalCount,
        });
        if (isImageLoading) {
          setIsImageLoading(true);
        } else {
          setIsImageLoading(false);
          dispatch(toggleLoader(false, 1));
        }
      }
    });
  }, [
    paginationData.sortColumn,
    paginationData.sortDirection,
    paginationData.pageSize,
    paginationData.pageNumber,
    directorName,
  ]);

  const setPageType = (directorPageType) => {
    if (directorPageType === pageType.grid) {
      togglePageType({
        ...directorPageType,
        pageType: pageType.grid,
        showGrid: true,
      });
    } else {
      togglePageType({
        ...directorPageType,
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
        <Header page={directorPage.details}></Header>
        <div
          className="hero hero3"
          style={{
            background: `url(${directorImage}) no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="celeb-container">
            <div className="row">
              <div className="col-md-12">
                <div class="hero-ct">
                  <h1> Director listing - {page.showGrid ? "grid" : "list"}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page-single">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-sm-12 col-xs-12">
                <Topbar
                  totalCount={paginationData.totalDirectors}
                  pageType={page.pageType}
                  fetchSortedData={fetchSortedData}
                  setPageType={setPageType}
                  sortBylist={directorSortTypeList}
                  isFromDirectorSlide={props.location.isFromDirectorSlide}
                ></Topbar>
                {directorList.length === 0 ? (
                  <NoResultFound></NoResultFound>
                ) : (
                  <React.Fragment>
                    {!page.showGrid && (
                      <div className="row">
                        <DirectorList
                          directors={directorList}
                          isImageLoading={isImageLoading}
                        ></DirectorList>
                      </div>
                    )}
                    {page.showGrid && (
                      <div className="row">
                        <DirectorGrid
                          directors={directorList}
                          isImageLoading={isImageLoading}
                        ></DirectorGrid>
                      </div>
                    )}
                  </React.Fragment>
                )}

                {directorList.length > 0 && (
                  <Pagination
                    pageSize={paginationData.pageSize}
                    totalCount={paginationData.totalDirectors}
                    currentPage={paginationData.pageNumber}
                    changeCount={changeCelebrityCount}
                    pageNumberClicked={pageNumberClicked}
                    description="Directors"
                    countList={countList}
                  ></Pagination>
                )}
              </div>

              <div class="col-md-4 col-sm-12 col-xs-12">
                <DirectorSearchBox
                  handleSubmit={handleSubmit}
                  setDirectorName={setDirectorName}
                  directorName={directorName}
                  clearState={clearState}
                ></DirectorSearchBox>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default NetworkDetector(Directors);
