import React, { useState } from "react";
import { dashboard_data } from "../../../eve";
import { IoMdGrid } from "react-icons/io";
import { FiActivity } from "react-icons/fi";
import { SiSimpleanalytics } from "react-icons/si";
import { Link } from "react-router-dom";
import { LuMountain } from "react-icons/lu";

const Home = () => {
  let currentIndex = 1;
  let endIndex = 10;
  const distinct_ports = [...new Set(dashboard_data.map((item) => item.proto))];
  const distinct_sourceIp = [
    ...new Set(dashboard_data.map((item) => item.src_ip)),
  ];

  const distinct_categories = Array.from(
    dashboard_data
      .reduce((map, item) => {
        if (item.alert && item.alert.category) {
          map.set(item.alert.category, true);
        }
        return map;
      }, new Map())
      .keys()
  );

  // const distinct_sourceIP = Array.from(
  //   dashboard_data.reduce((map, item) => {
  //     if (item.alert && item.alert.category) {
  //       map.set(item.alert.category, true);
  //     }
  //     return map;
  //   }, new Map())
  //   .keys()
  // );

  const [securityData, setSecurityData] = useState(
    dashboard_data.slice(currentIndex, endIndex)
  );

  const setPorts = (portValue) => {
    if (portValue === "all") {
      setSecurityData(dashboard_data.slice(currentIndex, endIndex));
    } else {
      const dataArr = [...dashboard_data];
      const newArr = dataArr.filter((value) => value.proto === portValue);
      setSecurityData(newArr.slice(currentIndex, endIndex + 1));
    }
  };
  const setSrcIp = (ipValue) => {
    if (ipValue === "all") {
      setSecurityData(dashboard_data.slice(currentIndex, endIndex));
    } else {
      const dataArr = [...dashboard_data];
      const newArr = dataArr.filter((value) => value.src_ip === ipValue);
      setSecurityData(newArr.slice(currentIndex, endIndex + 1));
      if (newArr.length > 10) {
        setSecurityData(newArr.slice(currentIndex, endIndex + 1));
      } else {
        setSecurityData(newArr);
      }
    }
  };

  const setCategories = (categoryValue) => {
    if (categoryValue === "all") {
      setSecurityData(dashboard_data.slice(currentIndex, endIndex));
    } else {
      const dataArr = [...dashboard_data];
      const newArr = dataArr.filter(
        (value) => value.alert && value.alert.category === categoryValue
      );
      if (newArr.length > 10) {
        setSecurityData(newArr.slice(currentIndex, endIndex + 1));
      } else {
        setSecurityData(newArr);
      }
    }
  };

  function LineChart(props) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: [
                { x: "Jan", y: 43 },
                { x: "Feb", y: 137 },
                { x: "Mar", y: 61 },
                { x: "Apr", y: 145 },
                { x: "May", y: 26 },
                { x: "Jun", y: 154 },
              ],
            },
            {
              id: "Mobile",
              data: [
                { x: "Jan", y: 60 },
                { x: "Feb", y: 48 },
                { x: "Mar", y: 177 },
                { x: "Apr", y: 78 },
                { x: "May", y: 96 },
                { x: "Jun", y: 204 },
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    );
  }

  const returnTime = (tString) => {
    const [date, time] = tString.split("T");
    return date + " " + time;
  };

  return (
    <div className="flex bg-gray-500 min-h-[100vh] ">
      {/* <div className="bg-gray-900 text-white flex flex-col items-start p-6 gap-6 border-r border-gray-800 w-30 shrink-0">
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
            Overview
          </Link>
          <Link
            to="/activity"
            className="flex items-center gap-2 text-sm font-medium hover:bg-gray-800 px-3 py-2 rounded-md"
          >
            <FiActivity className="text-xl" />
            Activity
          </Link>
        </nav>
      </div> */}
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
      <div className="mx-3  w-60 flex-1">
        <h3 className="font-bold text-gray-900 my-4">Security Data</h3>
        <div className="flex justify-evenly gap-2">
          <select
            onChange={(e) => setPorts(e.target.value)}
            className="relative w-full cursor-default rounded-md font-semibold py-1.5 pl-2 text-left bg-[#263445] text-gray-400 text-xs shadow-sm ring-1 ring-inset ring-[#263445] focus:outline-none focus:ring-2 focus:to-gray-700 sm:text-sm sm:leading-6"
          >
            <option
              value="all"
              className="flex justify-between relative font-bold w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              Ports
            </option>
            {distinct_ports.map((data) => (
              <option
                value={data}
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
              >
                {data}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSrcIp(e.target.value)}
            className="relative w-full cursor-default rounded-md font-semibold bg-[#263445] text-gray-400 py-1.5 pl-2 text-left text-xs shadow-sm ring-1 ring-inset ring-[#263445] focus:outline-none focus:ring-2  sm:text-sm sm:leading-6"
          >
            <option
              value="all"
              className="relative font-bold w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 text-xs shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              Source IP
            </option>
            {distinct_sourceIp.map((data) => (
              <option
                value={data}
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
                {data}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setCategories(e.target.value)}
            className="relative w-full cursor-default rounded-md font-semibold bg-[#263445] text-gray-400 text-xs py-1.5 pl-2 text-left shadow-sm ring-1 ring-inset ring-[#263445] focus:outline-none focus:ring-2  sm:text-sm sm:leading-6"
          >
            <option
              value="all"
              className="relative font-bold w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              Categories &nbsp;
            </option>
            {distinct_categories.map((data) => (
              <option
                value={data}
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              >
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 overflow-x-auto  border-gray-900 rounded-md border-2">
          <table className="w-full table-auto shadow-lg">
            <thead>
              <tr className="bg-[#263445] text-gray-400">
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Timestamp
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Flow ID
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Interface
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Event Type
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Source IP
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Destination IP
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Port
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Protocol
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  data Action
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Signature ID
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Signature
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Revisions
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Category
                </th>
                <th className="text-[14px] px-4 py-2 text-xs text-left">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody>
              {securityData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-200 text-[#111827] shadow-lg font-medium dark:border-gray-700 "
                >
                  <td className="text-[11px] px-4 py-2">
                    {returnTime(data.timestamp)}
                  </td>
                  <td className="text-[11px] px-4 py-2">{data.flow_id}</td>
                  <td className="text-[11px] px-4 py-2">{data.in_iface}</td>
                  <td className="text-[11px] px-4 py-2">{data.event_type}</td>
                  <td className="text-[11px] px-4 py-2">{data.src_ip}</td>
                  <td className="text-[11px] px-4 py-2">{data.dest_ip}</td>
                  <td className="text-[11px] px-4 py-2">{data.dest_port}</td>
                  <td className="text-[11px] px-4 py-2">{data.proto}</td>
                  {data.alert === undefined ? (
                    ""
                  ) : (
                    <>
                      <td className="text-[11px] px-4 py-2">
                        {data.alert.action}
                      </td>
                      <td className="text-[11px] px-4 py-2">
                        {data.alert.signature_id}
                      </td>
                      <td className="text-[11px] py-2">
                        {data.alert.signature}
                      </td>
                      <td className="text-[11px] px-4 py-2">
                        {data.alert.rev}
                      </td>
                      <td className="text-[11px] px-4 py-2">
                        {data.alert.category}
                      </td>
                      <td className="text-[11px] px-4 py-2">
                        {data.alert.severity}
                      </td>
                    </>
                  )}
                  {/* <td className="px-4 py-2">{data.alert.action == undefined ? ""  : data.alert.action  }</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
