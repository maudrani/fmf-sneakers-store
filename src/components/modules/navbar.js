import React, { useEffect, useState } from "react";
import { Container, Text } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";

import { Link } from "react-scroll";

const Nav = styled(Container)`
  position: fixed;
  top: 0%;
  z-index: 100;
  background-color: rgba(28, 28, 28, 0.9);

  @media (max-width: 768px) {
    span {
      padding: 8px 10px;
      font-size: 15px;
    }

    img {
      display: none;
    }
  }

  @media (max-width: 460px) {
    span {
      padding: inherit 7px;
      font-size: 12px;
    }

    .navLogo {
      display: none;
    }
  }
`;

const Navbar = () => {
  const [scrolled, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkConfig = {
    whitesmoke: true,
    xs: true,
    pw: "xs",
    weight: "regular",
    "hover-scale": "md",
    "hover-color": "yellow",
    "d-shadow": "1",
    style: { ...{ cursor: "pointer" } },
  };

  const isMobile = window.innerWidth <= 768 ? true : false;

  const scrollLinkConfig = {
    smooth: true,
    duration: isMobile ? 1000 : 700,
    offset: 5,
  };

  const logoConfig = {
    "w-8": true,
    "hover-scale": "md",
  };

  return (
    <Nav
      w-100
      direction="r"
      justify="sb"
      pw="lg"
      style={{
        transition: scrolled && "0s",
        transform: scrolled && "translateY(-100%)",
      }}
    >
      <Container w-50 justify="fs" sm-w="w-1">
        <Logo
          className="navLogo"
          color="black-white"
          attributes={logoConfig}
          style={{ minWidth: "1rem", maxWidth: "2.5rem" }}
        />
      </Container>

      <Container ph="xs" w-50 justify="fe" sm-w="w-100" sm-justify="c">
        <Link to="home" {...scrollLinkConfig} offset={0}>
          <Text {...navLinkConfig}>INICIO</Text>
        </Link>
        <Link to="about" {...scrollLinkConfig}>
          <Text {...navLinkConfig}>ACERCA</Text>
        </Link>
        <Link to="designs" {...scrollLinkConfig}>
          <Text {...navLinkConfig}>DISEÑOS</Text>
        </Link>
        <Link to="contact" {...scrollLinkConfig}>
          <Text {...navLinkConfig}>CONTACTO</Text>
        </Link>
      </Container>
    </Nav>
  );
};

export default Navbar;
