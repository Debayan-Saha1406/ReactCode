import React from "react";
import { Line } from "react-chartjs-2";

const Report = (props) => {
  return (
    <div className="card">
      <div className="au-card-inner">
        <h3 className="title-2">recent reports</h3>
        <div className="chart-info">
          <div className="chart-info__right">
            <div className="chart-statis">
              <div className="chart-note">
                <span className="dot dot--blue"></span>
                <span>products</span>
              </div>
              <div className="chart-note mr-0">
                <span className="dot dot--green"></span>
                <span>services</span>
              </div>
            </div>
          </div>
        </div>
        <div className="recent-report__chart">
          <div
            style={{
              width: "450px",
              height: "200px",
            }}
          >
            <Line options={props.options} data={props.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
