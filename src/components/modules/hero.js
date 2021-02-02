import React from "react";
import { Container, Button, Img } from "../../framework/assets";
import city from "../../Assets/IMG/Background/city.svg";
import logo from "../../Assets/IMG/Brand/logo-full.svg";
import styled from "styled-components";

import { Link as RouteLink } from "react-router-dom";

const City = styled(Container)`
  background-image: url(${city});
  bottom: 0;
  mix-blend-mode: screen;

  @media (max-width: 800px) {
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Hero = () => {
  return (
    <Container
      bg-image="wall-graffiti"
      vh-100
      direction="c"
      b-shadow="inset-3"
      id="home"
    >
      <Container h-100 w-100 justify="sb" pw="lg">
        <Container direction="c" h-100 w-100>
          <Container w-25 align="fe" h-80 md-w="w-50" lg-h="h-60">
            <Img
              src={logo}
              w-100
              ph="sm"
              d-shadow="7"
              style={{ minWidth: "18rem" }}
            />
          </Container>
          <RouteLink to="/store">
            <Button
              xs
              whitesmoke
              ph="xs"
              pw="md"
              b-radius="semi"
              hover-scale="sm"
              hover-color="yellow"
              bg="black"
              weight="bold"
              d-shadow="7"
            >
              Ir Tienda
            </Button>
          </RouteLink>
        </Container>
      </Container>
      <City vh-15 w-100 />
    </Container>
  );
};

export default Hero;
