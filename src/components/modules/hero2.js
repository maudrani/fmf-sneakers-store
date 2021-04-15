import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import logoNew2 from "../../Assets/IMG/Brand/logo new/logo-new-2.svg";

const Hero2 = () => {
  return (
    <Container
      vh-100
      w-100
      direction="c"
      style={{ backgroundColor: "#FFF700" }}
    >
      <Container w-100 vh-85 justify="sb">
        <Img src={logoNew2} w-100 />
      </Container>
      <Container w-100 vh-5 direction="c">
        <Text medium-black weight="light">
          ZAPATILLAS PERSONALIZADAS
        </Text>
        <Text sm medium-black weight="black">
          CUSTOM SNEAKERS
        </Text>
      </Container>

      {/* Absolutes */}
      <Container w-100 vh-100 style={{ position: "absolute" }}>
        <Container
           
          style={{
            position:'absolute',
            transform: "rotate(-90deg)",
            left: "-5%",
          }}
        >
          <Text weight='black' >
            Tucuman, Argentina{" "}
            <Text weight="light">www.fmfsneakers.com rights.</Text>
          </Text>
        </Container>
        <Container
        direction='c'
           
          style={{
            position:'absolute',
            right: "5%",
          }}
        >
          <Text md main>Insta</Text>
          <Text md main>Insta</Text>
          <Text md main>Insta</Text>
          <Text md main>Insta</Text>
        </Container>
      </Container>
    </Container>
  );
};

export default Hero2;
