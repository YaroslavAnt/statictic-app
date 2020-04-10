import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
} from "recharts";

import { STATISTIC_ENDPOINT, BASE_URL } from "../../config";
import "./style.scss";

const Charts = ({ match }) => {
  const {
    params: { id: userId },
  } = match;

  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endtDate, setEndtDate] = useState("");

  const fetchData = async () => {
    let query = startDate || endtDate ? "?" : "";
    if (startDate) {
      query += `from=${startDate}`;
    }
    if (endtDate) {
      query += startDate ? `&to=${endtDate}` : `to=${endtDate}`;
    }
    const res = await fetch(
      `${BASE_URL}${STATISTIC_ENDPOINT}/${userId}${query}`
    );
    res
      .json()
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => alert("Fail to fetch data"));
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endtDate]);

  return (
    <main className="charts-page">
      <div className="topbar">
        <div className="breadcrumbs">
          <NavLink
            exact
            to="/"
            className="breadcrumb"
            activeClassName="breadcrumb--selected"
          >
            Main page
          </NavLink>
          &ensp;>&ensp;
          <NavLink
            to="/users"
            exact
            className="breadcrumb"
            activeClassName="breadcrumb--selected"
          >
            User statistics
          </NavLink>
          &ensp;>&ensp;
          <NavLink
            to={`/users/${userId}`}
            exact
            className="breadcrumb"
            activeClassName="breadcrumb--selected"
          >
            {data[0] && data[0].first_name + data[0].last_name}
          </NavLink>
        </div>
        <div>
          From
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={({ target }) => setStartDate(target.value)}
          />
          &ensp; To
          <input
            type="date"
            name="endtDate"
            id="endtDate"
            onChange={({ target }) => setEndtDate(target.value)}
          />
        </div>
      </div>

      <h1 className="huge-font heading">
        <b>{data[0] && data[0].first_name + " " + data[0].last_name}</b>
      </h1>

      <h2 className="big-font bold">Clicks</h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h2 className="big-font bold">Views</h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId1"
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="page_views"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default withRouter(Charts);
