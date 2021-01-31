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

const Card = ({ product, inViewport, forwardedRef, animated }) => {
  const { img, price, name, description } = product;

  let isMobile = false;
  if (window.innerWidth <= 768) {
    isMobile = "true";
  }

  const containerAnims = animated
    ? {
        "hover-shadow": !isMobile && "1",
        "hover-scale": !isMobile && "sm",
      }
    : {};

  const containerMobileConfig =
    isMobile && inViewport && animated
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
    isMobile && inViewport && animated
      ? {
          "transform-scale": "lg",
          "d-shadow": "7",
        }
      : {};

  return (
    <CardContainer
      direction="c"
      ref={forwardedRef}
      {...containerAnims}
      {...containerMobileConfig}
      mh='xs'
    >
      <Container style={{ overflow: "hidden", maxHeight: "20rem" }}>
        <CardImg
          src={img}
          ref={forwardedRef}
          {...imgMobileConfigs}
          {...imgAnims}
        />
      </Container>
      <Container  w-100 direction="c" align="fs" sm-align='c'>
        <Text main md red>
          {name}
        </Text>
        <Text weight="light">{description}</Text>
        <Text sm ph="xs" weight="regular" style={{borderBottom: '1px solid'}}>
          ${price}
        </Text>
      </Container>
    </CardContainer>
  );
};

export default Card;
