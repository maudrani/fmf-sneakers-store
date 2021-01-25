import React from "react";
import { Container, Text, Button, Img } from "../../framework/assets";
import city from "../../Assets/IMG/Background/city.svg";
import logo from "../../Assets/IMG/Brand/logo-original.svg";

const Hero = () => {
  return (
    <Container bg-image="wall-graffiti" vh-100 direction="c">
      <Container h-100 w-100 justify="sb" pw="lg">
        <Container direction="c" h-100 w-100>
          <Img src={logo} w-25 ph="md" d-shadow="7" />

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
      <Container
        style={{
          backgroundImage: `url(${city})`,
          position: "absolute",
          bottom: "0",
          /* top: '94%', */
          zIndex: -5,
        }}
        vh-15
        vw-98
      />
    </Container>
  );
};

export default Hero;
