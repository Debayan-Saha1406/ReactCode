/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import Header from "./../Common/Header";
import { searchBarSubType, apiUrl, page } from "./../../../Shared/Constants";
import Footer from "./../Common/Footer";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import NetworkDetector from "../Common/NetworkDetector";
import BoxPagination from "../Common/BoxPagination";

const SearchList = (props) => {
  const { searchTerm, searchType, fetchNoData, toggle } = props.location;
  const [paginationData, setPaginationData] = useState({
    pageNumber: 1,
    pageSize: 2,
    totalCount: 0,
    isClicked: false,
  });
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  const hideLoader = (isLastImage) => {
    if (isLastImage) {
      dispatch(toggleLoader(false, 1));
    }
  };

  useEffect(() => {
    if (fetchNoData) {
      dispatch(toggleLoader(false, 1));
    }

    if (searchTerm) {
      const body = {
        searchType: searchType,
        searchTerm: searchTerm,
        pageNumber: paginationData.isClicked ? paginationData.pageNumber : 1,
        pageSize: paginationData.pageSize,
      };
      ServiceProvider.post(apiUrl.search, body).then((response) => {
        if (response.status === 200) {
          setSearchData(response.data.data.details);
          if (!paginationData.isClicked) {
            setPaginationData({
              ...paginationData,
              totalCount: response.data.data.totalCount,
              isClicked: false,
              pageNumber: 1,
            });
          } else {
            setPaginationData({
              ...paginationData,
              totalCount: response.data.data.totalCount,
              isClicked: false,
            });
          }
          dispatch(toggleLoader(false, 1));
        }
      });
    }
  }, [
    dispatch,
    searchTerm,
    searchType,
    fetchNoData,
    toggle,
    paginationData.pageNumber,
    paginationData.pageSize,
  ]);

  const pageNumberClicked = (page) => {
    if (page !== paginationData.pageNumber) {
      dispatch(toggleLoader(true, "15%"));
      setPaginationData({
        ...paginationData,
        pageNumber: page,
        isClicked: true,
      });
    }
  };

  const nextArrowBtnClicked = () => {
    dispatch(toggleLoader(true, "15%"));
    setPaginationData({
      ...paginationData,
      pageNumber: paginationData.pageNumber + 1,
      isClicked: true,
    });
  };

  const prevArrowBtnClicked = () => {
    dispatch(toggleLoader(true, "15%"));
    setPaginationData({
      ...paginationData,
      pageNumber: paginationData.pageNumber - 1,
      isClicked: true,
    });
  };

  return (
    <React.Fragment>
      {showLoader && (
        <div id="loaderContainer">
          <div id="loader">
            <LoaderProvider></LoaderProvider>
          </div>
        </div>
      )}
      <div
        style={{
          opacity: screenOpacity,
          backgroundColor: "#020d18",
        }}
      >
        <Header showSearchBar={true} searchTerm={searchTerm}></Header>

        <div className="search-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                {searchData.length === 0 || fetchNoData ? (
                  <h2
                    style={{
                      color: "white",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                    }}
                  >
                    Enter a letter or words to search in the search bar
                  </h2>
                ) : (
                  <React.Fragment>
                    <h1
                      style={{
                        color: "white",
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                      }}
                    >
                      Results For {`"${searchTerm}"`}
                    </h1>
                    {searchData.map((searchItem, index) => (
                      <div
                        key={index}
                        className="blog-item-style-1 search-list"
                      >
                        <img
                          src={searchItem.image}
                          alt=""
                          className="search-record-image"
                          style={{ height: "150px", width: "125px" }}
                          onLoad={() => {
                            hideLoader(searchData.length - 1 === index);
                          }}
                        />
                        <div className="blog-it-infor">
                          <React.Fragment>
                            <h2 className="search-record-name" style={{}}>
                              {searchItem.type ===
                              searchBarSubType.celebrity ? (
                                <Link
                                  className="heading"
                                  to={`/celebrity-details/${searchItem.id}`}
                                >
                                  {searchItem.name}
                                </Link>
                              ) : searchItem.type ===
                                searchBarSubType.director ? (
                                <Link
                                  className="heading"
                                  to={`/director-details/${searchItem.id}`}
                                >
                                  {searchItem.name}
                                </Link>
                              ) : (
                                <Link
                                  className="heading"
                                  to={`/movie-details/${searchItem.id}`}
                                >
                                  {searchItem.name}
                                </Link>
                              )}
                            </h2>
                            <span className="search-type">
                              {searchItem.type}
                            </span>
                          </React.Fragment>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          {paginationData.totalCount > 0 && (
            <BoxPagination
              pageSize={paginationData.pageSize}
              totalCount={paginationData.totalCount}
              currentPage={paginationData.pageNumber}
              pageNumberClicked={pageNumberClicked}
              nextArrowBtnClicked={nextArrowBtnClicked}
              prevArrowBtnClicked={prevArrowBtnClicked}
              description="Movies"
            ></BoxPagination>
          )}
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default NetworkDetector(SearchList);
