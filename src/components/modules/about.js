import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import sneakHand from "../../Assets/IMG/Various/yellow-art-1.webp";
import sneaker from "../../Assets/IMG/Products/demo/sneaker2.webp";
import { IsMobile, MaxWidth } from "../../helpers/functions";
import SocialMedia from "../basics/socialMedia";

const About = () => {
  return (
    <Container
      black
      pw={!MaxWidth(1000) ? "lg" : "xs"}
      style={{ minHeight: "100vh", overflow: "hidden"}}
      justify="sb"
      sm-direction="cr"
      id="acerca"
    >
      <Container
        h-100
        w-50
        sm-w="w-100"
        pw={!MaxWidth(1000) && "xl"}
        hover-scale="md"
      >
        <Img
          alt="about image"
          src={sneaker}
          style={{ transform: "rotate(-15deg)", minWidth: "20rem" }}
          d-shadow={!IsMobile() && "8"}
        />
      </Container>
      <Container h-100 w-50 sm-w="w-100" ph="lg" direction="c">
        <Text main white xl style={{ textAlign: "center" }}>
          Quienes somos
        </Text>
        <Text yellow xs ph="xs">
          FMF SNEAKERS ARGENTINA
        </Text>
        <Text
          white
          style={{
            textAlign: "center",
            lineHeight: "27px",
            wordSpacing: "4px",
          }}
        >
          FMF Sneakers Argentina se crea en el año 2020 a partir de la creativa
          idea de tres amigos, Facu, Maxi y Facu, al darnos cuenta que en
          nuestros país nadie se dedicaba a zapatillas/sneakers customizados,
          convirtiéndonos así en ser los primeros y mejores al día de hoy en
          nuestro país en hacer esto. Con el objetivo de crear los mejores y más
          innovadores diseños para ustedes, les presentamos la página web
          oficial de FMF SNEAKERS ARGENTINA.
        </Text>
        <Container mh="md">
          <Container w-15 mw="xs" syle={{ maxHeight: "5rem" }}>
            <SocialMedia />
          </Container>
          <Container w-15 mw="xs" syle={{ maxHeight: "5rem" }}>
            <SocialMedia socialMedia="instagram" />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default About;
