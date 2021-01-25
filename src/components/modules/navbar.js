import React, { useEffect, useState, useRef } from "react";
import { Container, Link } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";

const Nav = styled(Container)`
  position: fixed;
  transition: all 0.15s;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(true);

  /* const navRef = useRef();
  navRef.current = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 600;
      if (navRef.current !== show) {
        setScrolled(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []); */

  const linkConfig = {
    whitesmoke: scrolled,
    "hover-color": "yellow",
    xs: true,
    pw: "xs",
    weight: "regular",
  };
  const logoConfig = {
    "w-8": true,
    "hover-scale": "md",
  };

  return (
    <Nav
      bg={scrolled && "black"}
      w-100
      direction="r"
      justify="sb"
      ph="xs"
      pw="lg"
      style={{ zIndex: "100" }}
    >
      <Container w-50 justify="fs">
        <Logo
          color={scrolled ? "whitesmoke" : "black"}
          attributes={logoConfig}
          style={{ minWidth: "4rem" }}
        />
      </Container>
      <Container w-50 justify="fe">
        <Link {...linkConfig}>INICIO</Link>
        <Link {...linkConfig}>TIENDA</Link>
        <Link {...linkConfig}>ACERCA</Link>
        <Link {...linkConfig}>SERVICIOS</Link>
        <Link {...linkConfig}>CONTACTO</Link>
      </Container>
    </Nav>
  );
};

export default Navbar;
