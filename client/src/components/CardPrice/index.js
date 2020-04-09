import React from "react";
import "./style.scss";

const CardPrice = ({ img, title, price, options }) => {
  return (
    <article className="card card--price">
      <h3 className="card--price-title medium-font">{title}</h3>
      <img src={img} alt="icon" className="card--price-img" />
      <p className="card--price-price huge-font">${price}</p>
      <ul className="card--price-text">
        {options.map((option) => {
          return (
            <li className="small-font" key={option}>
              {option}
            </li>
          );
        })}
      </ul>
      <span className="button button--blue">Purchase now</span>
    </article>
  );
};

export default CardPrice;
