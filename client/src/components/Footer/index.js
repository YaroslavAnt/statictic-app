import React from "react";
import "./style.scss";

const Footer = ({ isTransparent }) => {
  return (
    <footer
      className={`footer ${
        isTransparent ? "footer--transparent" : "footer--with-bg"
      }`}
    >
      <span className="big-font">AppCo</span>
      <span className="small-font">All rights reserved by ThemeTags</span>
      <span className="small-font">Copyrights © 2019.</span>
    </footer>
  );
};

export default Footer;
