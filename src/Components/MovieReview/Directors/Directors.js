/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import Header from "./../Common/Header";

import "../../../css/movie-single.css";
import { sortColumns, sortDirection } from "./../../../Shared/Constants";
import { useState } from "react";
import Topbar from "./../Common/Topbar";
import { pageType } from "./../../../Shared/Constants";
import { directorSortTypeList } from "./../../../Shared/Constants";
import NoResultFound from "./../Common/NoResultFound";
import DirectorList from "./DirectorList";
import DirectorGrid from "./DirectorGrid";
import BoxStylePagination from "../Common/BoxStylePagination";

const initialData = {
  totalDirectors: 0,
  pageNumber: 1,
  pageSize: 1,
  directorList: [],
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
  const [directorData, setDirectorData] = useState(initialData);
  const [page, togglePageType] = useState(directorPageType);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const fetchSortedData = () => {};

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
                  totalCount={directorData.totalDirectors}
                  pageType={page.pageType}
                  fetchSortedData={fetchSortedData}
                  setPageType={setPageType}
                  sortBylist={directorSortTypeList}
                ></Topbar>
                {directorData.directorList.length !== 0 ? (
                  <NoResultFound></NoResultFound>
                ) : (
                  <React.Fragment>
                    {!page.showGrid && (
                      <div className="row">
                        {
                          <DirectorList
                            directors={directorData.directorList}
                            isImageLoading={isImageLoading}
                          ></DirectorList>
                        }
                      </div>
                    )}
                    {page.showGrid && (
                      <DirectorGrid
                        directors={directorData.directorList}
                        isImageLoading={isImageLoading}
                      ></DirectorGrid>
                    )}
                  </React.Fragment>
                )}

                <BoxStylePagination></BoxStylePagination>
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
