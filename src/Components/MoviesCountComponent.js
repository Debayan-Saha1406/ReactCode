import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  type: "line",
  datasets: [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "Dataset",
      backgroundColor: "rgba(255,255,255,.1)",
      borderColor: "rgba(255,255,255,.55)",
    },
  ],
};

const axes = [
  { primary: true, type: "bubble", position: "bottom" },
  { type: "bubble", position: "left" },
];

const options = {
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
        },
      },
    ],
  },
  title: {
    display: false,
  },
  elements: {
    line: {
      borderWidth: 0,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

const MoviesCount = (props) => {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="overview">
        <div className="overview__inner">
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
              <Line options={options} data={data} type={"line"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCount;
