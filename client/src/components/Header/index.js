import React from "react";
import "./style.scss";

const Header = ({ isTransparent }) => {
  return (
    <header
      className={`header ${
        isTransparent ? "header--transparent" : "header--with-bg"
      }`}
    >
      <span className="big-font">AppCo</span>
    </header>
  );
};

export default Header;
