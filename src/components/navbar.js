import React from "react";
import { Container, Link } from "../framework/assets";
import styled from "styled-components";

const Navbar = () => {
  const Nav = styled(Container)`
    position: fixed;
  `;

  const linkConfig = {
    "hover-color": "yellow",
    regular: true,
    xs: true,
    "p-w": "xs",
  };

  return (
    <Nav w-100 black direction="r" justify="sb" p-h="xs" p-w="lg">
      <Container w-50 justify="fs">
        <Link yellow {...linkConfig}>
          Logo
        </Link>
      </Container>
      <Container w-50 justify="fe">
        <Link yellow {...linkConfig}>
          HOME
        </Link>
        <Link whitesmoke {...linkConfig}>
          ABOUT
        </Link>
        <Link whitesmoke {...linkConfig}>
          SERVICES
        </Link>
        <Link whitesmoke {...linkConfig}>
          CONTACT
        </Link>
      </Container>
    </Nav>
  );
};

export default Navbar;
