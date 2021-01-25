import React from "react";
import { Container, Text } from "../../framework/assets";
import sneakHand from "../../Assets/IMG/sneak2.png";

const About = () => {
  return (
    <Container vh-100 black pw="md">
      <Container
        h-100
        w-50
      >
        <img alt="img" src={sneakHand} />
      </Container>
      <Container w-50 h-100 direction="c" align="fs">
        <Text main whitesmoke xl>
          Quienes somos
        </Text>
        <Text w-50 whitesmoke xs ph="xs">
          FMF SNEAKERS ARGENTINA - ¡Zapatillas customizadas diseños únicos y
          propios! <br /> Envíos a todo el país.
        </Text>
      </Container>
    </Container>
  );
};

export default About;
