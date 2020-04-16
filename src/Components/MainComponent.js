import React, { Component } from "react";
import { connect } from "react-redux";
import QuickInfo from "./QuickInfo";
import "../css/movieCount.css";

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

const data1 = {
  labels: ["January", "February", "March", "April", "May", "June"],
  type: "line",
  datasets: [
    {
      data: [1, 18, 9, 17, 34, 22],
      label: "Dataset",
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,.55)",
    },
  ],
};

const options1 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  responsive: true,
  tooltips: {
    mode: "index",
    titleFontSize: 12,
    titleFontColor: "#000",
    bodyFontColor: "#000",
    backgroundColor: "#fff",
    titleFontFamily: "Montserrat",
    bodyFontFamily: "Montserrat",
    cornerRadius: 3,
    intersect: false,
  },
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
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

const data3 = {
  labels: ["January", "February", "March", "April", "May", "June"],
  type: "line",
  datasets: [
    {
      data: [65, 59, 84, 84, 51, 55],
      label: "Dataset",
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,.55)",
    },
  ],
};

const options3 = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  responsive: true,
  tooltips: {
    mode: "index",
    titleFontSize: 12,
    titleFontColor: "#000",
    bodyFontColor: "#000",
    backgroundColor: "#fff",
    titleFontFamily: "Montserrat",
    bodyFontFamily: "Montserrat",
    cornerRadius: 3,
    intersect: false,
  },
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
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

const data4 = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "My First dataset",
      data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
      borderColor: "transparent",
      borderWidth: "0",
      backgroundColor: "rgba(255,255,255,.3)",
    },
  ],
};

const options4 = {
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        categoryPercentage: 1,
        barPercentage: 0.65,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

class Main extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          opacity: this.props.screenOpacity,
        }}
      >
        <div className="row m-t-25">
          <QuickInfo
            overview={"c1"}
            overview_inner={"c1_inner"}
            data={data}
            options={options}
          ></QuickInfo>
          <QuickInfo
            overview={"c2"}
            overview_inner={"c2_inner"}
            data={data1}
            options={options1}
          ></QuickInfo>
          <QuickInfo
            overview={"c3"}
            overview_inner={"c3_inner"}
            data={data3}
            options={options3}
          ></QuickInfo>
          <QuickInfo
            overview={"c4"}
            overview_inner={"c4_inner"}
            data={data4}
            options={options4}
          ></QuickInfo>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

export default connect(mapStateToProps, null)(Main);
