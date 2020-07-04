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
        style={{
          opacity: screenOpacity,
          backgroundColor: "#020d18",
        }}
      >
        <Header showSearchBar={true} searchTerm={searchTerm}></Header>

        <div class="search-single">
          <div class="container">
            <div className="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
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
                      <div class="blog-item-style-1 search-list">
                        <img
                          src={searchItem.image}
                          alt=""
                          className="search-record-image"
                          style={{ height: "150px", width: "125px" }}
                          onLoad={() => {
                            hideLoader(searchData.length - 1 === index);
                          }}
                        />
                        <div class="blog-it-infor">
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
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default NetworkDetector(SearchList);
