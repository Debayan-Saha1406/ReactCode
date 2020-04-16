import React from "react";
import { Line } from "react-chartjs-2";

const QuickInfo = (props) => {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={props.overview}>
        <div className={props.overview_inner}>
          <div className="overview-box clearfix">
            <div className="icon"></div>
            <div className="text">
              <h2>1</h2>
              <span>movies</span>
            </div>
          </div>
          <div className="overview-chart">
            <div
              style={{
                width: "300px",
                height: "100px",
              }}
            >
              <Line options={props.options} data={props.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInfo;
