import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboard_data } from "../../../eve";
import { IoMdGrid } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { SiSimpleanalytics } from "react-icons/si";
import { LuMountain } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";
import { SiHandshakeProtocol } from "react-icons/si";
import { Chart, registerables } from "chart.js";
import { FaLocationDot } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

Chart.register(...registerables);
const chart_color = "white";
const chart_bgcolor = "black";

const Analytics = () => {
  const distinct_sourceIp = [
    ...new Set(dashboard_data.map((item) => item.src_ip)),
  ];
  const distinct_destIp = [
    ...new Set(dashboard_data.map((item) => item.src_ip)),
  ];
  const data = [...dashboard_data];
  const chartRef1 = React.createRef();
  const chartRef2 = React.createRef();
  const chartRef3 = React.createRef();
  const chartRef4 = React.createRef();

  const alerts = dashboard_data.filter((object) =>
    object.hasOwnProperty("alert")
  );

  const tcpCount = dashboard_data.filter((object) => object.proto === "TCP");
  const udpCount = dashboard_data.filter((object) => object.proto === "UDP");
  const [severityCounts, setSeverityCounts] = useState({});
  const [timestamps, setTimestamps] = useState({});

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Alerts by Category",
        data: [],
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
      },
    ],
  });

  const [monthData, setmonthData] = useState({
    labels: [],
    datasets: [
      {
        label: "Alerts by Month",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    const categories = {};
    data.forEach((item) => {
      if (item.alert && item.alert.category) {
        if (!categories[item.alert.category]) {
          categories[item.alert.category] = 0;
        }
        categories[item.alert.category]++;
      }
    });

    setChartData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: "Alert by Category",
          data: Object.values(categories),
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (chartRef1.current.chartInstance) {
      chartRef1.current.chartInstance.destroy();
    }

    const ctx = chartRef1.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Alerts by Category",
        },
        scales: {
          y: {
            grid: {
              color: chart_color,
            },
            ticks: {
              color: chart_color,
            },
          },
          x: {
            grid: {
              color: chart_color,
            },
            ticks: {
              color: chart_color,
            },
          },
        },
      },
    });

    chartRef1.current.chartInstance = chart;
  }, [chartData]);

  useEffect(() => {
    if (chartRef2.current.chartInstance) {
      chartRef2.current.chartInstance.destroy();
    }

    const ctx = chartRef2.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: chartData1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Alerts by Severity",
            color: chart_color,
          },
        },
      },
    });

    chartRef2.current.chartInstance = chart;
  }, [chartData]);

  useEffect(() => {
    if (chartRef3.current.chartInstance) {
      chartRef3.current.chartInstance.destroy();
    }

    const ctx = chartRef3.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: chartData2,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Alerts over Time",
            color: chart_color,
          },
        },
      },
    });

    chartRef3.current.chartInstance = chart;
  }, [chartData]);

  useEffect(() => {
    if (chartRef4.current.chartInstance) {
      chartRef4.current.chartInstance.destroy();
    }
    const ctx = chartRef4.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: monthData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Alerts by Month",
            color: chart_color,
          },
        },
      },
    });

    chartRef4.current.chartInstance = chart;
  }, [chartData]);

  // useEffect(() => {
  //   if (chartRef4.current.chartInstance) {
  //     chartRef4.current.chartInstance.destroy();
  //   }

  //   const ctx = chartRef4.current.getContext("2d");
  //   const chart = new Chart(ctx, {
  //     type: "line",
  //     data: chartData3,
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: "top",
  //         },
  //         title: {
  //           display: true,
  //           text: "Alerts over Time",
  //         },
  //       },
  //     },
  //   });

  //   chartRef4.current.chartInstance = chart;
  // }, [chartData]);

  useEffect(() => {
    const severityMap = {};
    dashboard_data.forEach((item) => {
      if (item.hasOwnProperty("alert")) {
        const severity = item.alert.severity;
        if (!severityMap[severity]) {
          severityMap[severity] = 0;
        }
        severityMap[severity]++;
      }
    });

    setSeverityCounts(severityMap);
  }, []);
  useEffect(() => {
    const timestampMap = {};
    dashboard_data.forEach((item) => {
      const timestamp = item.timestamp;
      if (!timestampMap[timestamp]) {
        timestampMap[timestamp] = 0;
      }
      timestampMap[timestamp]++;
    });

    setTimestamps(timestampMap);
  }, []);
  useEffect(() => {
    const months = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    // dashboard_data.forEach((item) => {
    //   const month = item.timestamp.substring(0, 7); // extract month from timestamp (e.g. "2019-01")
    //   if (!months[month]) {
    //     months[month] = 0;
    //   }
    //   months[month]++;
    // });
    dashboard_data.forEach((item) => {
      const month = getMonth(item.timestamp);
      months[month]++;
    });

    const labels = Object.keys(months);
    const data = Object.values(months);
    const backgroundColor = labels.map((label) => getRandomColor());

    setmonthData({
      labels,
      datasets: [
        {
          label: "Alerts by Month",
          data,
          backgroundColor,
        },
      ],
    });
  }, []);

  const chartData1 = {
    labels: Object.keys(severityCounts),
    datasets: [
      {
        label: "Alerts by Severity",
        data: Object.values(severityCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartData2 = {
    labels: Object.keys(timestamps),
    datasets: [
      {
        label: "Alerts over Time",
        data: Object.values(timestamps),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getMonth(timestamp) {
    const date = new Date(timestamp);
    const month = date.toLocaleString("en-US", { month: "long" });
    return month;
  }

  return (
    <div className="flex bg-gray-500">
      <div className="bg-gray-900 text-white flex flex-col items-center px-2 pt-6 gap-6 border-r border-gray-800 w-30 shrink-0 md:flex md:flex-col md:items-start md:p-6 md:gap-6 md:border-r md:border-gray-800 md:w-30 md:shrink-0">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <LuMountain />
        </Link>
        <nav className="flex flex-col gap-2 w-full">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
            prefetch={false}
          >
            <IoMdGrid className="text-xl" />
            <span className="hidden md:inline">Overview</span>
          </Link>

          <Link
            to="/activity"
            className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
          >
            <FiActivity className="text-xl" />
            <span className="hidden md:inline">Activity</span>
          </Link>
        </nav>
      </div>

      <div className="w-full">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
          <div class="w-full bg-[#263445] text-red-600 rounded-md shadow-md p-4">
            <h2 class="text-xl font-bold mb-2 text-red-600 ">Total Alerts</h2>
            <p class="text-red-600 600 mb-4">
              <GoAlertFill />
            </p>
            <h3 class="text-2xl font-bold">{alerts.length}</h3>
            <p class="text-sm text-gray-500">+20.1% from last month</p>
          </div>

          <div class="rounded-md bg-[#263445] text-blue-500 shadow-md p-4">
            <h2 class="text-xl text-blue-500 font-bold mb-2">
              Source IP Summary
            </h2>
            <p class="text-blue-600 600 mb-4">
              <FaLocationDot />
            </p>
            <h3 class="text-2xl font-bold">{distinct_sourceIp.length}</h3>
            <p class="text-sm text-gray-500">+10.1% from last month</p>
          </div>
          <div class="rounded-md bg-[#263445] text-yellow-500 shadow-md p-4">
            <h2 class="text-xl text-yellow-500 font-bold mb-2">
              Destination IP Summary
            </h2>
            <p class="text-yellow-600 600 mb-4">
              <FaHome />
            </p>
            <h3 class="text-2xl font-bold">{distinct_destIp.length}</h3>

          </div>

          <div class="rounded-md bg-[#263445] text-yellow-600 shadow-md p-4">
            <h2 class="text-xl font-bold mb-2 text-yellow-600">
              Protocol Summary
            </h2>
            <p class="text-yellow-600 mb-4">{<SiHandshakeProtocol />}</p>
            <div className="grid grid-cols-2">
              <h6 class="font-bold  ">TCP: {tcpCount.length}</h6>
              <h6 class="font-bold">UDP: {udpCount.length}</h6>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-[#263445] md:w-[100%-2rem] sm:w-[90%] w-[80%]  mx-4 rounded-md shadow-md">
            <canvas ref={chartRef1} />
          </div>

          <div className="flex mt-4 items-center justify-evenly">
            <div className="bg-[#263445] mt-4 w-[30%]  rounded-md shadow-md">
              <canvas ref={chartRef2} />
            </div>

            <div className="bg-[#263445] mt-4 w-[30%]  rounded-md shadow-md">
              <canvas ref={chartRef4} />
            </div>
          </div>
          <div className="bg-[#263445] mx-4 mt-4 rounded-md shadow-md">
            <canvas ref={chartRef3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
