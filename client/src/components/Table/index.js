import React from "react";
import "./style.scss";

const Table = ({ rows = [] }) => {
  console.log({ rows });
  const tableRows = rows.map((row) => {
    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.first_name}</td>
        <td>{row.last_name}</td>
        <td>{row.email}</td>
        <td>{row.gender}</td>
        <td>{row.ip_addres}</td>
        <td>{row.clicks}</td>
        <td>{row.page_views}</td>
      </tr>
    );
  });

  return (
    <div className="table-box">
      <table className="table small-font">
        <thead className="table-head">
          <tr>
            <th>id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>IP address</th>
            <th>Total clicks</th>
            <th>Total page views</th>
          </tr>
        </thead>
        <tbody className="table-body">{tableRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
