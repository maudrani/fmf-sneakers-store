import React from "react";
import { Container, Button, Img, Text } from "../../framework/assets";

const Card = ({ product }) => {
  const { img, price, name, description } = product;

  return (
    <Container
      w-20
      h-100
      b-radius="xs"
      pw="xs"
      mw="xs"
      whitesmoke
      b-shadow="2"
      direction="c"
      hover-shadow="1"
    >
      <Container h-45 w-100 ph="xs">
        <Img src={img} hover-scale="lg" d-shadow="7" />
      </Container>
      <Container ph="sm" direction="c" h-40>
        <Text main md red>
          '{name}'
        </Text>
        <Text>{description}</Text>
        <Text md ph="xs" weight="light">
          ${price}
        </Text>
        <Button
          xs
          whitesmoke
          ph="xs"
          pw="md"
          b-radius="semi"
          hover-scale="sm"
          bg="black"
          weight="bold"
        >
          Comprar
        </Button>
      </Container>
    </Container>
  );
};

export default Card;
