import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import facebook from "../../Assets/IMG/Social/facebook.svg";
import instagram from "../../Assets/IMG/Social/instagram.svg";

const Footer = () => {
  return (
    <Container black ph="sm" pw="lg" b-shadow="4" justify="sb" w-100>
      <Container justify='fs'>
        <Img src={facebook} w-10 hover-scale="md" />
        <Img src={instagram} w-10 mw="xs" hover-scale="md" />
        <Text whitesmoke>Tucumán, Argentina</Text>
      </Container>
      <Text whitesmoke weight="thin">
        FMF Custom Sneakers 2021 - All rights reserved.
      </Text>
    </Container>
  );
};

export default Footer;
