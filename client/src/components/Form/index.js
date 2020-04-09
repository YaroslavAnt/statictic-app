import React from "react";
import "./style.scss";

const Form = () => {
  return (
    <div className="form">
      <input type="text" placeholder="Enter your email" />
      <span className="button button--blue">Subscribe</span>
    </div>
  );
};

export default Form;
