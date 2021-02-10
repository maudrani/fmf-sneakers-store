import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import facebook from "../../Assets/IMG/Social/facebook-white.svg";
import instagram from "../../Assets/IMG/Social/instagram-white.svg";

const Footer = () => {
  return (
    <Container
      black
      ph="xs"
      pw="lg"
      justify="sb"
      w-100
      sm-direction="c"
      sm-h="vh-40"
    >
      <Container justify="sb" sm-justify="sa" h-100 sm-direction="c">
        <Container w-20 sm-w="w-70" justify='sa'>
          <Container  w-50 md-w='w-30'>
            <a
              href="https://www.facebook.com/FMF-Sneakers-Argentina-2-102814918391934/"
              rel="noreferrer"
              target="_blank"
            >
              <Img alt='socialmedia icon' src={facebook} w-100 hover-scale="md" style={{minWidth:'3rem'}}/>
            </a>
          </Container>
          <Container  w-50 md-w='w-30'>
            <a
              href="https://www.instagram.com/fmfsneakers_arg2/"
              rel="noreferrer"
              target="_blank"
            >
              <Img alt='socialmedia icon' src={instagram} w-100 hover-scale="md" style={{minWidth:'3rem'}}/>
            </a>
          </Container>
        </Container>
        <Text white style={{ textAlign: "center" }}>
          Tucumán, Argentina
        </Text>
      </Container>
      <Text white weight="thin" style={{ textAlign: "center" }}>
        <Text weight="thin" yellow>
          FMF Custom Sneakers 2021
        </Text>{" "}
        - Todos los derechos reservados.
      </Text>
    </Container>
  );
};

export default Footer;
