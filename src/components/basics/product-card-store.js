import React from "react";
import { Container, Img, Text, Configs } from "../../framework/assets";
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

const Card = ({ product, inViewport, forwardedRef, animated, launchModal }) => {
  const { img, price, name, category } = product;

  let isMobile = false;
  if (window.innerWidth <= 768) {
    isMobile = "true";
  }

  const imgAnims = animated
    ? {
        "hover-shadow": !isMobile && "7",
        "hover-scale": !isMobile && "lg",
      }
    : {};

  const imgMobileConfigs =
    isMobile && inViewport && animated
      ? {
          "transform-scale": "lg",
          "d-shadow": "7",
        }
      : {};

  return (
    <CardContainer
      direction="c"
      align="fs"
      ref={forwardedRef}
      mh="xs"
      style={{maxWidth: '25rem'}}
      onClick={() =>
        launchModal({
          launched: true,
          product: { ...product },
        })
      }
    >
      <Container
        style={{ overflow: "hidden", maxHeight: "30rem"}}
      >
        <CardImg
          src={img}
          ref={forwardedRef}
          {...imgMobileConfigs}
          {...imgAnims}
          hover-scale="lg"
        />
      </Container>
      <Container w-100 direction="c" align="fs" sm-align="c">
        <Text main md red>
          {name}
        </Text>
        <Text weight="light">{category}</Text>
        <Text sm ph="xs" weight="light" style={{ borderBottom: "1px solid" }}>
          ${price}
        </Text>
      </Container>
    </CardContainer>
  );
};

export default Card;
