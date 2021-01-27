import React from "react";
import { Container, Button, Img, Text } from "../../framework/assets";
import styled from "styled-components";

const CardContainer = styled(Container)`
  cursor: pointer;

  @media (max-width: 450px) {
    cursor: default;
  }
`;

const Card = ({ product, inViewport, forwardedRef }) => {
  const { img, price, name, description } = product;

  let isMobile = false;
  if (window.innerWidth <= 768) {
    isMobile = "true";
  }

  let containerOptions = {};
  let imgOptions = {};

  containerOptions = isMobile &&
    inViewport && {
      "transform-scale": "sm",
      "b-shadow": "8",
    };

  imgOptions = isMobile &&
    inViewport && {
      "transform-scale": "lg",
      "d-shadow": "7",
    };

  return (
    <CardContainer
      h-100
      b-radius="xs"
      pw="xs"
      ph="xs"
      whitesmoke
      b-shadow="6"
      direction="c"
      hover-shadow={!isMobile && "1"}
      hover-scale={!isMobile && "sm"}
      ref={forwardedRef}
      {...containerOptions}
    >
      <Container h-45 w-100>
        <Img
          src={img}
          hover-scale={!isMobile && "lg"}
          d-shadow="8"
          hover-shadow={!isMobile && "7"}
          {...imgOptions}
          ref={forwardedRef}
        />
      </Container>
      <Container ph="sm" mh="xs" direction="c" h-40>
        <Text main lg red>
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
          hover-scale="md"
          bg="black"
          weight="bold"
          b-shadow="2"
        >
          Comprar
        </Button>
      </Container>
    </CardContainer>
  );
};

export default Card;
