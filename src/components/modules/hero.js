import React from "react";
import { Container, Img, Text } from "../../framework/assets";
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
    <Container w-100 bg-image="wall-graffiti" vh-100 direction="c" b-shadow="inset-4">
      <Container h-100 w-100 justify="sb" pw="lg">
        <Container direction="c" h-100 w-100>
          <Container w-25 align="fe" h-80 md-w="w-50" lg-h="h-60">
            <Img
              alt="fmf logo"
              src={logo}
              w-100
              ph="sm"
              d-shadow="5"
              style={{ minWidth: "18rem" }}
            />
          </Container>

          <Container w-30 md-w='w-70' sm-direction='c' /* h-15 */>
            <Container
              w-50
              sm-w='w-100'
              black
              mw="xs"
              hover-scale="sm"
              hover-bg="darkest-yellow"
              b-shadow="8"
              style={{ padding: ".5rem 0" }}
              bg-image='wall'
            >
              <RouteLink to="/categories" style={{ textDecoration: "none" }}>
                <Text main white md>
                  categorías
                </Text>
              </RouteLink>
            </Container>
            <Container
              w-50
              sm-w='w-100'
              black
              mw="xs"
              hover-scale="sm"
              hover-bg="darkest-yellow"
              b-shadow="8"
              bg-image='wall'
              style={{ padding: ".5rem 0" }}
            >
              <RouteLink to="/store" style={{ textDecoration: "none" }}>
                <Text main white md>
                  store
                </Text>
              </RouteLink>
            </Container>
          </Container>
        </Container>
      </Container>
      <City vh-15 w-100 />
    </Container>
  );
};

export default Hero;
