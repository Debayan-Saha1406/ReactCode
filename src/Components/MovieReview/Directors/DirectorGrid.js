import React from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";

const DirectorGrid = (props) => {
  const dispatch = useDispatch();
  const hideLoader = (isLastImage) => {
    if (isLastImage && props.isImageLoading) {
      dispatch(toggleLoader(false, 1));
    }
  };
  return (
    <React.Fragment>
      {props.directors.map((director, index) => (
        <div class="col-md-4 col-sm-12 col-xs-12">
          <div class="blog-item-style-2">
            <img
              src={director.photo}
              alt=""
              style={{ height: "250px", width: "180px" }}
              onLoad={() => {
                hideLoader(props.directors.length - 1 === index);
              }}
            />
            <div class="blog-it-infor">
              <Link className="heading" to={`/director-details/${director.id}`}>
                {director.directorName}
              </Link>
              <br></br>
              <span class="time" style={{ textTransform: "uppercase" }}>
                {director.nationality}
              </span>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default DirectorGrid;
