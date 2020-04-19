import React, { Component } from "react";
import { connect } from "react-redux";
import QuickInfo from "./Common/QuickInfo";
import "../css/quickInfo.css";
import "../css/report.css";
import "../css/Doughnut.css";
import Report from "./Common/Report";
import DoughnutChart from "./Common/DoughnutChart";

const doughnutData = {
  datasets: [
    {
      label: "My First dataset",
      data: [60, 40],
      backgroundColor: ["#00b5e9", "#fa4251"],
      hoverBackgroundColor: ["#00b5e9", "#fa4251"],
      borderWidth: [0, 0],
      hoverBorderColor: ["transparent", "transparent"],
    },
  ],
  labels: ["Products", "Services"],
};

const doughnutLabels = ["Products", "Services"];

const doughnutOptions = {
  maintainAspectRatio: false,
  responsive: true,
  cutoutPercentage: 55,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  legend: {
    display: false,
  },
  tooltips: {
    titleFontFamily: "Poppins",
    xPadding: 15,
    yPadding: 10,
    caretPadding: 0,
    bodyFontSize: 16,
  },
};

const brandProduct = "rgba(0,181,233,0.8)";
const brandService = "rgba(0,173,95,0.8)";
const reportData1 = [52, 60, 55, 50, 65, 80, 57, 70, 105, 115];
var reportData2 = [102, 70, 80, 100, 56, 53, 80, 75, 65, 90];

const reportData = {
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
    "",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandService,
      borderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      borderWidth: 0,
      data: reportData1,
    },
    {
      label: "My Second dataset",
      backgroundColor: brandProduct,
      borderColor: "transparent",
      pointHoverBackgroundColor: "#fff",
      borderWidth: 0,
      data: reportData2,
    },
  ],
};

const reportOptions = {
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: true,
          color: "#f2f2f2",
        },
        ticks: {
          fontFamily: "Poppins",
          fontSize: 12,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: 50,
          max: 150,
          fontFamily: "Poppins",
          fontSize: 12,
        },
        gridLines: {
          display: true,
          color: "#f2f2f2",
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

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
        <div className="row">
          <div className="col-lg-6">
            <Report data={reportData} options={reportOptions}></Report>
          </div>
          <div className="col-lg-6">
            <DoughnutChart
              data={doughnutData}
              options={doughnutOptions}
              labels={doughnutLabels}
            ></DoughnutChart>
          </div>
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
