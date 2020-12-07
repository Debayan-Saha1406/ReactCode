import React, { Component } from "react";
import { connect } from "react-redux";
import QuickInfo from "./Common/QuickInfo";
import "../../css/quickInfo.css";
import "../../css/report.css";
import "../../css/Doughnut.css";
import Report from "./Common/Report";
import DoughnutChart from "./Common/DoughnutChart";
import ServiceProvider from "../../Provider/ServiceProvider";
import {
  apiUrl,
  doughnutData,
  doughnutOptions,
  doughnutLabels,
} from "../../Shared/Constants";
import { toggleLoader } from "./../../Store/Actions/actionCreator";
import LoaderProvider from "./../../Provider/LoaderProvider";

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

class Main extends Component {
  state = {
    moviesCount: 0,
    directorsCount: 0,
    celebsCount: 0,
    isDataFetched: false,
    usersCount: 0,
  };
  componentDidMount() {
    this.props.toggleLoader(true, 0);
    ServiceProvider.get(apiUrl.moviesDirectorsCelebsCount).then((response) => {
      if (response.status === 200) {
        this.setState({
          moviesCount: response.data.data.moviesCount,
          celebsCount: response.data.data.celebsCount,
          directorsCount: response.data.data.directorsCount,
        });
      }
    });

    ServiceProvider.get(apiUrl.users).then((response) => {
      let count = 0;
      response.data.data.forEach((user) => {
        if (!user.isAdmin) {
          count++;
        }
      });

      this.setState({ usersCount: count, isDataFetched: true }, () => {
        this.createDoughnutChartCalculations();
        this.props.toggleLoader(false, 1);
      });
    });
  }

  createDoughnutChartCalculations() {
    let sum =
      this.state.moviesCount +
      this.state.celebsCount +
      this.state.directorsCount;
    const moviePercentage = Math.round((this.state.moviesCount / sum) * 100);
    const celebPercentage = Math.round((this.state.celebsCount / sum) * 100);
    const directorPercentage = Math.round(
      (this.state.directorsCount / sum) * 100
    );

    doughnutData.datasets[0].data = [
      moviePercentage,
      celebPercentage,
      directorPercentage,
    ];
  }

  render() {
    return (
      <React.Fragment>
        {this.props.showLoader && (
          <div id="loaderContainer">
            <div id="loader">
              <LoaderProvider></LoaderProvider>
            </div>
          </div>
        )}
        <div
          style={{
            opacity: this.props.screenOpacity,
          }}
        >
          <div className="row m-t-25">
            {this.state.isDataFetched && (
              <React.Fragment>
                <QuickInfo
                  overview={"c1"}
                  overview_inner={"c1_inner"}
                  description={"Movies"}
                  count={this.state.moviesCount}
                ></QuickInfo>
                <QuickInfo
                  overview={"c2"}
                  overview_inner={"c2_inner"}
                  description={"Celebs"}
                  count={this.state.celebsCount}
                ></QuickInfo>
                <QuickInfo
                  overview={"c3"}
                  overview_inner={"c3_inner"}
                  description={"Directors"}
                  count={this.state.directorsCount}
                ></QuickInfo>
                <QuickInfo
                  overview={"c4"}
                  overview_inner={"c4_inner"}
                  description={"Users"}
                  count={this.state.usersCount}
                ></QuickInfo>
              </React.Fragment>
            )}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Report data={reportData} options={reportOptions}></Report>
            </div>
            {this.state.isDataFetched && (
              <div className="col-lg-6">
                <DoughnutChart
                  data={doughnutData}
                  options={doughnutOptions}
                  labels={doughnutLabels}
                ></DoughnutChart>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
