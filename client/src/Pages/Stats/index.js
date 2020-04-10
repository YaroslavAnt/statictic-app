import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as qs from "qs";

import "./style.scss";
import Table from "../../components/Table";
import { USERS_ENDPOINT, BASE_URL } from "../../config";
import Pagination from "../../components/Pagination";

const Stats = ({ history, location }) => {
  const { search } = location;
  const { page = 1 } = qs.parse(search, { ignoreQueryPrefix: true });

  const [rows, setRows] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const fetchData = async () => {
    const query = search
      ? `${search}&amount=${usersPerPage}`
      : `?amount=${usersPerPage}`;
    const res = await fetch(`${BASE_URL}${USERS_ENDPOINT}${query}`);
    res
      .json()
      .then(({ data, last_page }) => {
        setLastPage(last_page);
        setRows(data);
      })
      .catch((err) => alert("Fail to fetch data"));
  };

  const handlePageChange = ({ selected }) =>
    history.push(`/users?page=${selected + 1}`);

  const handleUsersPerPageChange = ({ target }) => {
    setUsersPerPage(target.value);
    history.push(`/users?page=${1}`);
  };

  useEffect(() => {
    fetchData();
  }, [search, usersPerPage]);

  return (
    <main className="stats-page">
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
            className="breadcrumb"
            activeClassName="breadcrumb--selected"
          >
            User statistics
          </NavLink>
        </div>
        <div>
          {[10, 15, 20].map((number) => {
            return (
              <label htmlFor={`number${number}`} key={number}>
                <input
                  type="radio"
                  name="number"
                  value={number}
                  checked={number === +usersPerPage}
                  id={`number${number}`}
                  onChange={handleUsersPerPageChange}
                />
                {number}
              </label>
            );
          })}
          &ensp;rows
        </div>
      </div>

      <h1 className="huge-font heading">
        <b>Users statistics</b>
      </h1>

      <div className="scrollbox">
        <Table rows={rows} />
      </div>

      <div className="pagination-box">
        <Pagination
          pageCount={lastPage}
          handlePageChange={handlePageChange}
          selectedPage={page - 1}
        />
      </div>
    </main>
  );
};

export default withRouter(Stats);
