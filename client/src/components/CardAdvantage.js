import React from "react";

const CardAdvantage = ({ img, title, text }) => {
  return (
    <article className="card card--advantage">
      <img src={img} alt="icon" />
      <h3 className="card--advantage-title medium-font">{title}</h3>
      <p className="card--advantage-text small-font">{text}</p>
    </article>
  );
};

export default CardAdvantage;
