import React from "react";

const QuickInfo = ({
  count,
  description,
  overview,
  overview_inner,
  options,
  data,
}) => {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={overview}>
        <div className={overview_inner}>
          <div className="overview-box clearfix">
            <div className="icon"></div>
            <div className="text">
              <h2>{count}</h2>
              <span>{description}</span>
            </div>
          </div>
          <div className="overview-chart">
            <div
              style={{
                width: "300px",
                height: "100px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
