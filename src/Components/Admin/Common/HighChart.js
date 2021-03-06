import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import Chart from "highcharts-react-official";
import { chartTypes } from "./../../../Shared/Constants";

const HighChart = ({ data, title, type, sliced }) => {
  const [chartType, setChartType] = useState();
  const [options, setOptions] = useState({});
  const [xAxisCategories, setXAxixCategories] = useState([]);
  const handleChartChange = (chartType) => {
    setChartType(chartType);
  };
  useEffect(() => {
    if (chartType === chartTypes[0].value) {
      data.forEach((element) => {
        element.sliced = sliced;
      });
    } else {
      if (xAxisCategories.length === 0) {
        data.forEach((element) => {
          xAxisCategories.push(element.name);
        });
        setXAxixCategories(xAxisCategories);
      }
    }

    setOptions({
      chart: {
        type: chartType ? chartType.toLowerCase() : type.toLowerCase(),
        zoomType: "x",
      },
      title: {
        text: title,
      },
      // colors: ["red", "yellow", "green"], //Show For Custom Colors
      yAxis: {
        title: {
          text: chartType !== chartTypes[0].value ? "Percentage" : "",
        },
      },
      xAxis: {
        categories: xAxisCategories,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "",
          color: "#006600",
          lineWidth: 1,
          marker: {
            enabled: true,
            symbol: "circle",
            radius: 3,
            states: {
              hover: {
                enabled: true,
                lineWidth: 1,
              },
            },
          },
          data: data,
        },
      ],
    });
    if (!chartType) {
      setChartType(type);
    }
  }, [chartType, data, sliced, title, type]);

  return (
    <div className="card">
      <div className="au-card-inner">
        <div style={{ textAlign: "end", marginBottom: "10px" }}>
          <label>Select Chart Type</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            name="language"
            style={{
              width: "25%",
              display: "inline-block",
              marginLeft: "10px",
              height: "41px",
            }}
            onChange={(e) => handleChartChange(e.target.value)}
            value={chartType}
          >
            {chartTypes.map((chartType, index) => (
              <option key={index} value={chartType.value}>
                {chartType.value}
              </option>
            ))}
          </select>
        </div>
        <div className="row no-gutters">
          <div className="row-center">
            <div className="col-xl-6">
              <div
                style={{
                  width: "450px",
                  height: "350px",
                }}
              >
                <Chart highcharts={Highcharts} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighChart;
