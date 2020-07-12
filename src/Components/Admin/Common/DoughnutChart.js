import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ labels, data, options }) => {
  return (
    <div className="card">
      <div className="au-card-inner">
        <h3 className="title-2 tm-b-5">char by %</h3>
        <div className="row no-gutters">
          <div className="col-xl-6">
            <div className="chart-note-wrap">
              <div className="chart-note mr-0 d-block">
                <span className="dot dot--blue"></span>
                <span>{labels[0]}</span>
              </div>
              <div className="chart-note mr-0 d-block">
                <span className="dot dot--red"></span>
                <span>{labels[1]}</span>
              </div>
              <div className="chart-note mr-0 d-block">
                <span className="dot dot--red"></span>
                <span>{labels[2]}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div
                style={{
                  width: "450px",
                  height: "200px",
                }}
              >
                <Doughnut data={data} options={options}></Doughnut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
