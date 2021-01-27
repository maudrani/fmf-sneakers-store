import React from "react";
import Hero from "../modules/hero";
import About from "../modules/about";
import Contact from "../modules/contact";
import Footer from "../modules/footer";
import Promo from "../modules/promo";

const Landing = () => {
  return (
    <div className="page">
      <Hero />
      <About />
      <Promo />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
