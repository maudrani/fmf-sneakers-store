import React, { useEffect } from "react";
import Hero from "../modules/hero3";
import About from "../modules/about";
import Designs from "../modules/designs";
import Suscription from "../modules/suscription";
import Politics from "../modules/politics";
import Navbar from "../modules/navbar";
import { Container } from "../../framework/assets";
import { IsMobile } from "../../helpers/functions";

import gsap, { Back } from "gsap";

const Landing = ({ className, setShowContact }) => {
  const navbarLinks = [
    { name: "store", route: "/store" },
    {
      name: "acerca",
      scroll: "acerca",
      offset: 10,
      useLocomotive: true,
    },
    {
      name: "diseños",
      scroll: "diseños",
      offset: 10,
      useLocomotive: true,
    },
    {
      name: "contacto",
      scroll: "contacto",
      offset: 100,
      useLocomotive: true,
    },
    {
      name: "info",
      scroll: "politics",
      useLocomotive: true,
    },
  ];

  useEffect(() => {
    const LogoFullAnimation = () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: Back.easeOut.config(2), opacity: 0 },
      });

      tl.from(
        ".landing-navbar",
        { delay: 1, opacity: 0, marginTop: "-2rem", transformOrigin: "top" },
        IsMobile() ? "=0.2" : "=0.5"
      );
    };

    LogoFullAnimation();
  }, []);

  useEffect(() => {
    setShowContact(true);
  }, [setShowContact]);

  return (
    <Container
      w-100
      direction="c"
      /* bg-image="wall" */
      /* b-shadow="inset-4" */
      whitesmoke
      data-scroll-section
      className="page"
    >
      <Navbar
        bgColor="black"
        links={navbarLinks}
        style={{ backgroundColor: "transparent" }}
        className="landing-navbar"
      />
      <Hero />
      <Designs />
      <Suscription />
      {/* <Promo promo={1} /> */}
      <About />
      <Politics />
    </Container>
  );
};

export default Landing;
