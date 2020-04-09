import React from "react";
import "./style.scss";
import phone from "../../assets/phone.png";
import macbook from "../../assets/macbook.png";
import CardAdvntageList from "../../components/CardAdvntageList";
import CardPriceList from "../../components/CardPriceList";
import Form from "../../components/Form";

const Main = () => {
  return (
    <main className="main-page">
      <section className="hero">
        <div>
          <h1 className="heading huge-font">
            <b>Brainstorming</b> for desired perfect Usability
          </h1>
          <p className="intro base-font">
            Our design projects are fresh and simple and will benefit your
            business greatly. Learn more about our work!
          </p>
          <span className="button button--white">Viev Stats</span>
        </div>
        <div className="hero-imgbox">
          <div>
            <img src={phone} alt="hero-img" />
            <span className="hero-img-shadow"></span>
          </div>
        </div>
      </section>

      <section className="advantages">
        <h2 className="heading big-font">
          Why <b>small business owners love</b> AppCo?
        </h2>
        <p className="intro base-font">
          Our design projects are fresh and simple and will benefit your
          business greatly. Learn more about our work!
        </p>
        <div className="cards">
          <CardAdvntageList />
        </div>
      </section>

      <section className="managing">
        <div className="managing-text">
          <h2 className="big-font">
            <b>Start Managing your apps business, more faster</b>
          </h2>
          <p className="intro small-font">
            Objectively deliver professional value with diverse web-readiness.
            Collaboratively transition wireless customer service without
            goal-oriented catalysts for change. Collaboratively.
          </p>
          <span className="button button--white">Learn More</span>
        </div>
        <img src={macbook} alt="section-img" className="managing-img" />
      </section>

      <section className="prices">
        <h2 className="heading big-font">
          <b>Afforadble Pricing and Packages</b> choose your best one
        </h2>
        <p className="intro base-font">
          Monotonectally grow strategic process improvements vis-a-vis
          integrated resources.
        </p>
        <div className="cards">
          <CardPriceList />
        </div>
        <p className="text base-font">
          If you need custom services or Need more?
          <span className="bold blue">Contact us</span>
        </p>
        <Form />
      </section>
    </main>
  );
};

export default Main;
