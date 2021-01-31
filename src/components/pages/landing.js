import React from "react";
import Hero from "../modules/hero";
import About from "../modules/about";
import Promo from "../modules/designs";

const Landing = () => {
  return (
    <div className="page">
      <Hero />
      <About />
      <Promo />
    </div>
  );
};

export default Landing;
