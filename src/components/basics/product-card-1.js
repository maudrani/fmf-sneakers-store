import React from "react";
import { Container, Button, Img, Text, Configs } from "../../framework/assets";
import styled from "styled-components";

const CardContainer = styled(Container)`
  cursor: pointer;

  @media (max-width: 450px) {
    cursor: default;
  }
`;

const CardImg = styled(Img)`
  ${CardContainer}:hover & {
    ${Configs.HoverConfigs}
  }
`;

const Card = ({ product, inViewport, forwardedRef, animated }) => {
  const { img, price, name, description } = product;

  let isMobile = false;
  if (window.innerWidth <= 734) {
    isMobile = "true";
  }

  const containerAnims = animated
    ? {
        "hover-shadow": !isMobile && "1",
        "hover-scale": !isMobile && "sm",
      }
    : {};

  const containerMobileConfig =
    isMobile && inViewport
      ? {
          "transform-scale": "sm",
          "b-shadow": "8",
        }
      : {};

  const imgAnims = animated
    ? {
        "hover-shadow": !isMobile && "7",
        "hover-scale": !isMobile && "lg",
      }
    : {};

  const imgMobileConfigs =
    isMobile && inViewport
      ? {
          "transform-scale": "lg",
          "d-shadow": "7",
        }
      : {};

  return (
    <CardContainer
      whitesmoke
      h-100
      b-radius="xs"
      pw="xs"
      ph="xs"
      b-shadow="6"
      direction="c"
      ref={forwardedRef}
      {...containerAnims}
      {...containerMobileConfig}
    >
      <Container h-45 w-100>
        <CardImg
          src={img}
          d-shadow="8"
          ref={forwardedRef}
          {...imgMobileConfigs}
          {...imgAnims}
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
