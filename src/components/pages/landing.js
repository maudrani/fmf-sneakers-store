import React from "react";
import Hero from "../modules/hero";
import About from "../modules/about";
import Designs from "../modules/designs";
import Footer from "../modules/footer";
import Contact from "../modules/contact";
import Navbar from "../modules/navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="page">
        <Hero />
        <About />
        <Designs />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
