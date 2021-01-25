import React, { useEffect, useState, useRef } from "react";
import { Container, Link } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";

const Nav = styled(Container)`
  position: absolute;
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef();
  navRef.current = scrolled;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 660;
      if (navRef.current !== show) {
        setScrolled(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkConfig = {
    whitesmoke: scrolled,
    xs: true,
    pw: "xs",
    weight: scrolled ? "regular" : "black",
    "hover-color": scrolled ? "yellow" : "red",
    "hover-scale": !scrolled && "md",
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
      style={{ zIndex: "100", position: scrolled && "fixed" }}
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
