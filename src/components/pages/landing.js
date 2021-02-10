import React from "react";
import Hero from "../modules/hero";
import About from "../modules/about";
import Designs from "../modules/designs";
import Politics from "../modules/politics";
import Navbar from "../modules/navbar";

const Landing = () => {
  const navbarLinks = [
    { name: "store", route: "/store" },
    { name: "acerca", scroll: "acerca" },
    { name: "diseños", scroll: "diseños" },
    { name: "contacto", scroll: "contacto" },
    { name: "info", scroll: "politics", offset: -47 },
  ];

  return (
    <div>
      <Navbar bgColor="black" links={navbarLinks} />
      <div className="page">
        <Hero />
        <About />
        <Designs />
        <Politics />
      </div>
    </div>
  );
};

export default Landing;
