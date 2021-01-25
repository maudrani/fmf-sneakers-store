import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/sneaker2.png";
import sneakers from "./db/sneakers";
import Card from "./card";

const Store = () => {
  return (
    <Container pw="lg" direction="c">
      <Container vh-80 h-80>
        <Container w-60>
          <Text lg main>
            <Text red lg main>
              Descubrí
            </Text>{" "}
            nuestros modelos
          </Text>
        </Container>

        <Container w-40>
          <Img src={sneaker} d-shadow="7" />
        </Container>
      </Container>

      <Container vh-80 w-100 h-100 pw="sm" ph="sm" vw-98 bg-image='wall'>
        {sneakers.map((card, idx) => {
          return <Card product={card} key={idx} />;
        })}
      </Container>
    </Container>
  );
};

export default Store;
