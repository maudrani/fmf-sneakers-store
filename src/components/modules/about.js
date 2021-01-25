import React from "react";
import { Container, Text } from "../../framework/assets";
import sneakHand from "../../Assets/IMG/sneak2.png";

const About = () => {
  return (
    <Container
      black
      pw="lg"
      style={{ minHeight: "115vh" }}
      justify="sb"
      sm-direction="cr"
    >
      <Container h-100 w-50 sm-w='w-100'>
        <img alt="img" src={sneakHand} />
      </Container>
      <Container h-100 w-50 sm-w='w-100' ph='lg' direction="c">
        <Text main whitesmoke xl style={{ textAlign: "center" }}>
          Quienes somos
        </Text>
        <Text yellow xs ph="xs">
          FMF SNEAKERS ARGENTINA
        </Text>
        <Text whitesmoke style={{ textAlign: "center" }}>
          Somos una tienda dedicada a la personalización de sneakers. Con
          diseños muy originales y solicitados en todo el país. <br />
          Elegidos por Duki, Oky, Dng Team y más.
        </Text>
      </Container>
    </Container>
  );
};

export default About;
