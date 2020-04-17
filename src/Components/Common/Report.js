import React from "react";
import { Line } from "react-chartjs-2";

const Report = (props) => {
  return (
    <div className="card">
      <div class="au-card-inner">
        <h3 class="title-2">recent reports</h3>
        <div class="chart-info">
          <div class="chart-info__right">
            <div class="chart-statis">
              <div class="chart-note">
                <span class="dot dot--blue"></span>
                <span>products</span>
              </div>
              <div class="chart-note mr-0">
                <span class="dot dot--green"></span>
                <span>services</span>
              </div>
            </div>
          </div>
        </div>
        <div class="recent-report__chart">
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
