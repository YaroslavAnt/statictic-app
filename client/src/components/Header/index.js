import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

const Header = ({ isTransparent }) => {
  return (
    <header
      className={`header ${
        isTransparent ? "header--transparent" : "header--with-bg"
      }`}
    >
      <NavLink to="/">
        <span className="big-font">AppCo</span>
      </NavLink>
    </header>
  );
};

export default Header;
