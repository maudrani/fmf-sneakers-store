import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import facebook from "../../Assets/IMG/Social/facebook-white.svg";
import instagram from "../../Assets/IMG/Social/instagram-white.svg";

const Footer = () => {
  return (
    <Container black ph="sm" pw="lg" justify="sb" w-100 sm-direction="c" sm-h='vh-40'>
      <Container justify="sa" h-100 sm-direction="c">
        <Container w-10 md-w="w-20">
          <Img src={facebook} w-100 hover-scale="md" />
          <Img src={instagram} w-100 mw="xs" hover-scale="md" />
        </Container>
        <Text whitesmoke style={{ textAlign: "center" }}>
          Tucumán, Argentina
        </Text>
      </Container>
      <Text whitesmoke weight="thin" style={{ textAlign: "center" }}>
        <Text weight="thin" yellow>
          FMF Custom Sneakers 2021
        </Text>{" "}
        - Todos los derechos reservados.
      </Text>
    </Container>
  );
};

export default Footer;
