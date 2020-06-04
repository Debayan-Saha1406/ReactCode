/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import Header from "./../Common/Header";

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
import BoxStylePagination from "../Common/BoxStylePagination";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import Pagination from "../Common/Pagination";

const initialData = {
  totalDirectors: 0,
  pageNumber: 1,
  pageSize: 10,
  sortColumn: sortColumns.directorName,
  sortDirection: sortDirection.asc,
};

const directorPageType = {
  pageType: pageType.list,
  showGrid: false,
};

const Directors = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [paginationData, setPaginationData] = useState(initialData);
  const [directorList, setDirectorList] = useState([]);
  const dispatch = useDispatch();
  const [page, togglePageType] = useState(directorPageType);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [directorName, setDirectorName] = useState("");

  const changeCelebrityCount = (e) => {
    setPaginationData({
      ...paginationData,
      pageNumber: initialData.pageNumber,
      pageSize: Number(e.target.value),
    });
  };

  const pageNumberClicked = (page) => {
    setPaginationData({
      ...paginationData,
      pageNumber: page,
    });
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    setPaginationData({
      ...paginationData,
      sortColumn: sortColumn,
      sortDirection: sortByDirection,
    });
  };

  const getSortingDetails = (e) => {
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
    } else {
      sortColumn = sortColumns.birthDate;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: paginationData.pageNumber,
      pageSize: paginationData.pageSize,
      sortColumn: paginationData.sortColumn,
      sortDirection: paginationData.sortDirection,
      directorName: directorName,
    };
    ServiceProvider.post(apiUrl.directors, body).then((response) => {
      if (response.status === 200) {
        setDirectorList(response.data.data.details);
        setPaginationData({
          ...paginationData,
          totalDirectors: response.data.data.totalCount,
        });
        dispatch(toggleLoader(false, 1));
      }
    });
  }, [
    paginationData.sortColumn,
    paginationData.sortDirection,
    paginationData.pageSize,
    paginationData.pageNumber,
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
        className="background"
        style={{
          opacity: screenOpacity,
        }}
      >
        <Header></Header>
        <div class="page-single">
          <div class="container">
            <div class="row">
              <div class="col-md-9 col-sm-12 col-xs-12">
                <Topbar
                  totalCount={paginationData.totalDirectors}
                  pageType={page.pageType}
                  fetchSortedData={fetchSortedData}
                  setPageType={setPageType}
                  sortBylist={directorSortTypeList}
                ></Topbar>
                {directorList.length === 0 ? (
                  <NoResultFound></NoResultFound>
                ) : (
                  <React.Fragment>
                    {!page.showGrid && (
                      <div className="row">
                        {
                          <DirectorList
                            directors={directorList}
                            isImageLoading={isImageLoading}
                          ></DirectorList>
                        }
                      </div>
                    )}
                    {page.showGrid && (
                      <DirectorGrid
                        directors={directorList}
                        isImageLoading={isImageLoading}
                      ></DirectorGrid>
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

              <div class="col-md-3 col-sm-12 col-xs-12">
                <div class="sidebar">
                  <div class="sb-search sb-it-box">
                    <h4 class="sb-title">Search</h4>
                    <input type="text" placeholder="Enter keywords" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Directors;
