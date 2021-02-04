import React, { useEffect, useState } from "react";
import { Container, Text } from "../../framework/assets";
import Logo from "../basics/logo";
import styled from "styled-components";
import BascketIcon from "../store/components/e-icon";
import CartSummary from "../store/components/cart-summary";
import Modal from "../../components/basics/modal";

import { Link } from "react-scroll";

const Nav = styled(Container)`
  position: fixed;
  top: 0%;
  z-index: 100;
  background-color: rgba(28, 28, 28, 0.9);

  @media (max-width: 768px) {
    padding: 1rem 1px;
    .navLink {
      padding: 0 10px;
      font-size: 15px;
    }

    .navLogo {
      display: none;
    }
  }

  @media (max-width: 460px) {
    .navLink {
      padding: 0 7px;
      font-size: 12px;
    }

    .navLogo {
      display: none;
    }
  }
`;

const CartModal = styled(Container)`
  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`;

const Navbar = () => {
  const [scrolled, setIsScrolling] = useState(false);
  const [modalLaunched, setModalLaunched] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!modalLaunched) {
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, 1200);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [modalLaunched]);

  const navLinkConfig = {
    className: "navLink",
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
      sm-justify="c"
      pw="lg"
      ph="xs"
      style={{
        transition: scrolled && "0s",
        transform: scrolled && "translateY(-100%)",
      }}
    >
      <Container w-50 justify="fs" sm-w="w-1">
        <Logo
          className="navLogo"
          color="whitesmoke"
          attributes={logoConfig}
          style={{ minWidth: "1rem", maxWidth: "2.5rem" }}
        />
      </Container>

      <Container w-50 justify="fe" sm-w="w-80" sm-justify="c">
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

      <Container
        sm-w="w-1"
        pw="xs"
        hover-scale="md"
        onClick={() => setModalLaunched(!modalLaunched)}
      >
        <BascketIcon size={1} />
      </Container>

      <Modal launched={modalLaunched} setLaunched={setModalLaunched}>
        <CartModal
          whitesmoke
          vw-80
          sm-w="vw-100"
          ph="md"
          pw="lg"
          b-radius="xs"
          b-shadow="2"
          style={{ maxHeight: "80vh", overflowY: "auto", display: "block" }}
        >
          <CartSummary />
        </CartModal>
      </Modal>
    </Nav>
  );
};

export default Navbar;
