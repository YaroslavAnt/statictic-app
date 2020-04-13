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

import { STATISTIC_ENDPOINT, USERS_ENDPOINT, BASE_URL } from "../../config";
import "./style.scss";

const Charts = ({ match }) => {
  const {
    params: { id: userId },
  } = match;

  var d = new Date();

  const [today] = new Date().toISOString().split("T");
  const [weekAgo] = new Date(d.setDate(d.getDate() - 7))
    .toISOString()
    .split("T");

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState(weekAgo);
  const [endtDate, setEndtDate] = useState(today);

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
      .catch((err) => alert("Fail to fetch data", err));
  };

  const fetchName = async () => {
    const res = await fetch(`${BASE_URL}${USERS_ENDPOINT}/${userId}`);
    res
      .json()
      .then(({ data }) => {
        const { first_name, last_name } = data;
        setFirstName(first_name);
        setLastName(last_name);
      })
      .catch((err) => alert("Fail to fetch data", err));
  };

  const createTableData = (startDate, endDate, data) => {
    let dates = [];
    const dayMilSec = 1000 * 60 * 60 * 24;
    const startMilSec = new Date(startDate).valueOf();
    const endMilSec = new Date(endDate).valueOf();

    for (let date = startMilSec; date < endMilSec; date += dayMilSec) {
      dates.push(new Date(date).toISOString().split("T")[0]);
    }

    const dataForTable = dates.map(
      (date) =>
        data.find((dataItem) => dataItem.date === date) || {
          first_name: "",
          last_name: "",
          date,
          clicks: 0,
          page_views: 0,
        }
    );
    return dataForTable;
  };

  useEffect(() => {
    fetchName();
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
            {`${firstName} ${lastName}`}
          </NavLink>
        </div>

        <form>
          From
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={({ target }) =>
              setStartDate(
                target.value < "2019-01-01" ? "2019-01-01" : target.value
              )
            }
          />
          &ensp; To
          <input
            type="date"
            name="endtDate"
            id="endtDate"
            value={endtDate}
            onChange={({ target }) =>
              setEndtDate(target.value > today ? today : target.value)
            }
          />
        </form>
      </div>

      <h1 className="huge-font heading">
        <b>{`${firstName} ${lastName}`}</b>
      </h1>

      <h2 className="big-font bold">Clicks</h2>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={200}
            data={createTableData(startDate, endtDate, data)}
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
            data={createTableData(startDate, endtDate, data)}
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
