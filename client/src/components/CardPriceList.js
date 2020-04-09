import React from "react";
import file from "../assets/file.png";
import online from "../assets/online.png";
import quiz from "../assets/quiz.png";
import CardPrice from "./CardPrice";

const data = [
  {
    img: file,
    title: "Basic",
    price: "29",
    options: [
      "Push Notifications",
      "Data Transfer",
      "SQL Database",
      "Search & SEO Analytics",
      "24/7 Phone Support",
      "2 months technical support",
      "2+ profitable keyword",
    ],
  },
  {
    img: online,
    title: "Standart",
    price: "149",
    options: [
      "Push Notifications",
      "Data Transfer",
      "SQL Database",
      "Search & SEO Analytics",
      "24/7 Phone Support",
      "2 months technical support",
      "2+ profitable keyword",
    ],
  },
  {
    img: quiz,
    title: "Unlimited",
    price: "39",
    options: [
      "Push Notifications",
      "Data Transfer",
      "SQL Database",
      "Search & SEO Analytics",
      "24/7 Phone Support",
      "2 months technical support",
      "2+ profitable keyword",
    ],
  },
];

const cards = data.map((card) => {
  return (
    <CardPrice
      img={card.img}
      title={card.title}
      price={card.price}
      options={card.options}
      key={card.title}
    />
  );
});

const CardPriceList = () => {
  return <>{cards}</>;
};

export default CardPriceList;
