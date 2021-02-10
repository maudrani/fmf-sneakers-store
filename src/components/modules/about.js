import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import sneakHand from "../../Assets/IMG/Various/yellow-art-1.webp";

const About = () => {
  return (
    <Container
      black
      pw="lg"
      style={{ minHeight: "100vh" }}
      justify="sb"
      sm-direction="cr"
      id="acerca"
    >
      <Container h-100 w-50 sm-w="w-100">
        <Img alt="about image" src={sneakHand} />
      </Container>
      <Container h-100 w-50 sm-w="w-100" ph="lg" direction="c">
        <Text main white xl style={{ textAlign: "center" }}>
          Quienes somos
        </Text>
        <Text yellow xs ph="xs">
          FMF SNEAKERS ARGENTINA
        </Text>
        <Text white style={{ textAlign: "center", lineHeight: '27px', wordSpacing:'4px' }}>
          FMF Sneakers Argentina se crea en el año 2020 a partir de la creativa
          idea de tres amigos, Facu, Maxi y Facu, al darnos cuenta que en
          nuestros país nadie se dedicaba a zapatillas/sneakers customizados,
          convirtiéndonos así en ser los primeros y mejores al día de hoy en
          nuestro país en hacer esto. Con el objetivo de crear los mejores y más
          innovadores diseños para ustedes, les presentamos la página web
          oficial de FMF SNEAKERS ARGENTINA.
        </Text>
      </Container>
    </Container>
  );
};

export default About;
