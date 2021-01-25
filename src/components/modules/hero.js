import React from "react";
import { Container, Button, Img } from "../../framework/assets";
import city from "../../Assets/IMG/Background/city.svg";
import logo from "../../Assets/IMG/Brand/logo-original.svg";
import styled from "styled-components";

const City = styled(Container)`
  background-image: url(${city});
  position: absolute;
  bottom: 0;
  z-index: -5;

  @media (max-width: 800px) {
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Hero = () => {
  return (
    <Container bg-image="wall-graffiti" vh-100 direction="c">
      <Container h-100 w-100 justify="sb" pw="lg">
        <Container direction="c" h-100 w-100>
          <Container w-25 md-w="w-50">
            <Img
              src={logo}
              w-100
              h-100
              ph="md"
              d-shadow="7"
              style={{ minWidth: "18rem" }}
            />
          </Container>

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
            hover-shadow="1"
          >
            TIENDA
          </Button>
        </Container>
      </Container>
      <City vh-15 vw-98 />
    </Container>
  );
};

export default Hero;
