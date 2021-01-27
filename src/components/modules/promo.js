import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/Products/sneaker2.webp";
import sneakers from "../store/db/sneakers";
import Card from "../store/card";
import styled from "styled-components";
import handleViewport from "react-in-viewport";

const Board = styled(Container)`
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 2rem;
`;

const Promo = () => {
  return (
    <Container direction="c">
      <Container vh-100 md-direction="c" w-100>
        <Container
          w-50
          md-w="w-100"
          pw="lg"
          ph="md"
          style={{ textAlign: "center" }}
        >
          <Text lg main>
            <Text red lg main>
              Descubrí
            </Text>{" "}
            nuestros diseños
          </Text>
        </Container>

        <Container w-50  md-w="w-100" pw="lg" ph='sm'>
          <Img src={sneaker} d-shadow="7"/>
        </Container>
      </Container>

      <Board pw="lg" ph="lg" w-100 bg-image="wall" b-shadow="inset-1">
        {sneakers.map((card, idx) => {
          const options = {
            rootMargin: "0px",
            threshold: 0.8,
          };
          const ViewCard = handleViewport(Card, options);
          return <ViewCard product={card} key={idx} inViewport />;
        })}
      </Board>
    </Container>
  );
};

export default Promo;
