import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import Header from "./../Common/Header";
import { searchBarSubType, apiUrl } from "./../../../Shared/Constants";
import Footer from "./../Common/Footer";
import ServiceProvider from "./../../../Provider/ServiceProvider";

const SearchList = (props) => {
  const { searchTerm, searchType, fetchNoData } = props.location;
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
        fetchAll: true,
      };
      ServiceProvider.post(apiUrl.search, body).then((response) => {
        if (response.status === 200) {
          setSearchData(response.data.data);
          dispatch(toggleLoader(false, 1));
        }
      });
    }
  }, [dispatch, searchTerm, searchType, fetchNoData]);

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
        <Header showSearchBar={true} searchTerm={searchTerm}></Header>
        <div class="page-single">
          <div class="container">
            <div class="row ipad-width2">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  {searchData.length === 0 || fetchNoData ? (
                    <h1
                      style={{
                        color: "white",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      Enter a word or phrase to search on in the search bar
                    </h1>
                  ) : (
                    searchData.map((searchItem, index) => (
                      <div class="col-md-12">
                        <div class="ceb-item-style-2">
                          <img
                            src={searchItem.image}
                            alt=""
                            style={{ height: "50px", width: "50px" }}
                            onLoad={() => {
                              hideLoader(searchData.length - 1 === index);
                            }}
                          />
                          <div class="ceb-infor">
                            <h2>
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
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default SearchList;
