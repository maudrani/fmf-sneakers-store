import React, { useEffect, useState } from "react";
import { Container, Link } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";

const Nav = styled(Container)`
  position: fixed;
  top: 0%;

  @media (max-width: 768px) {
    padding: 10px 10px;
    span {
      padding: 10px 10px;
      font-size: 10px;
    }

    img {
      display: none;
    }
  }

  @media (max-width: 468px) {
    padding: 10px 10px;
    span {
      padding: 10px 10px;
      font-size: 12px;
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

  const linkConfig = {
    whitesmoke: true,
    xs: true,
    pw: "xs",
    weight: "regular",
    "hover-scale": "md",
    "hover-color": "yellow",
    "d-shadow": "1",
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
      ph="xs"
      pw="lg"
      style={{
        transition: scrolled && "0s",
        zIndex: "100",
        position: "fixed",
        backgroundColor: "rgba(28, 28, 28, 0.90)",
        transform: scrolled && "translateY(-100%)",
      }}
    >
      <Container w-50 justify="fs" sm-w="w-1">
        <Logo
          color={"whitesmoke"}
          attributes={logoConfig}
          style={{ minWidth: "4rem" }}
        />
      </Container>

      <Container w-50 justify="fe" sm-w="w-100" sm-justify="c">
        <Link {...linkConfig}>INICIO</Link>
        <Link {...linkConfig}>TIENDA</Link>
        <Link {...linkConfig}>ACERCA</Link>
        <Link {...linkConfig}>CONTACTO</Link>
      </Container>
    </Nav>
  );
};

export default Navbar;
