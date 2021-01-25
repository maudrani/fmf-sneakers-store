import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/sneaker2.png";
import sneakers from "./db/sneakers";
import Card from "./card";
import styled from "styled-components";

const Board = styled(Container)`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 1rem;
`;

const Store = () => {
  return (
    <Container direction="c">
      <Container vh-100 md-direction="c" pw="lg" ph="lg">
        <Container w-60 md-w="w-100" style={{ textAlign: "center" }}>
          <Text lg main>
            <Text red lg main>
              Descubrí
            </Text>{" "}
            nuestros diseños
          </Text>
        </Container>

        <Container w-40 md-w="w-100" ph="md">
          <Img src={sneaker} d-shadow="7" />
        </Container>
      </Container>

      <Board pw="lg" ph="lg" vw-98 bg-image="wall">
        {sneakers.map((card, idx) => {
          return <Card product={card} key={idx} />;
        })}
      </Board>
    </Container>
  );
};

export default Store;
