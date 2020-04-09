import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as qs from "qs";

import "./style.scss";
import Table from "../../components/Table";
import { USERS_ENDPOINT, BASE_URL } from "../../config";
import Pagination from "../../components/Pagination";

const Stats = ({ history, location }) => {
  const { push } = history;
  const { search } = location;
  const { page } = qs.parse(search, { ignoreQueryPrefix: true });

  const [rows, setRows] = useState([]);

  const fetchData = async (query) => {
    const res = await fetch(`${BASE_URL}${USERS_ENDPOINT}${query}`);
    res
      .json()
      .then(({ data }) => setRows(data))
      .catch((err) => alert("Fail to fetch data"));
  };

  const handlePageChange = ({ selected }) =>
    push(`/stats?page=${selected + 1}`);

  useEffect(() => {
    fetchData(search);
  }, [search]);

  return (
    <main className="stats-page">
      <div className="breadcrumbs">
        <NavLink
          exact
          to="/"
          className="breadcrumb"
          activeClassName="breadcrumb--selected"
        >
          Main page
        </NavLink>
        &emsp;>&emsp;
        <NavLink
          to="/stats"
          className="breadcrumb"
          activeClassName="breadcrumb--selected"
        >
          Stats
        </NavLink>
      </div>

      <h1 className="huge-font heading">
        <b>Users statistics</b>
      </h1>

      <div className="scrollbox">
        <Table rows={rows} />
      </div>

      <div className="pagination-box">
        <Pagination
          pageCount={9}
          handlePageChange={handlePageChange}
          selectedPage={page - 1}
        />
      </div>
    </main>
  );
};

export default withRouter(Stats);
