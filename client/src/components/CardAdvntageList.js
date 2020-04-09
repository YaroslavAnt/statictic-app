import React from "react";
import clean from "../assets/clean.png";
import retina from "../assets/retina.png";
import secure from "../assets/secure.png";
import CardAdvantage from "./CardAdvantage";

const data = [
  {
    img: clean,
    title: "Clean Design",
    text: "Increase sales by showing true dynamics of your website.",
  },
  {
    img: secure,
    title: "Secure Data",
    text: "Build your online store s trust using Social Proof & Urgency.",
  },
  {
    img: retina,
    title: "Retina Ready",
    text: "Realize importance of social proof in customer s purchase decision.",
  },
];

const cards = data.map((card) => {
  return (
    <CardAdvantage
      img={card.img}
      title={card.title}
      text={card.text}
      key={card.title}
    />
  );
});

const CardAdvntageList = () => {
  return <>{cards}</>;
};

export default CardAdvntageList;
