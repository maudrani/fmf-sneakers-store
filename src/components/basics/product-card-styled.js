import React from "react";
import { Container, Img, Text, Configs } from "../../framework/assets";
import styled from "styled-components";
import categories from "../store/db/categories";
import { IsMobile } from "../../helpers/functions";

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

const CardText = styled(Text)`
  ${CardContainer}:hover & {
    ${Configs.HoverConfigs}
  }
`;

const Card = ({ product, inViewport, forwardedRef, animated, onClick }) => {
  const { category, name, description } = product;

  const img = IsMobile() ? product.images.x15[0] : product.images.x25[0];

  const containerAnims = animated
    ? {
        "hover-shadow": !IsMobile() && "1",
        "hover-scale": !IsMobile() && "sm",
      }
    : {};

  const containerMobileConfig =
    IsMobile() && inViewport && animated
      ? {
          "transform-scale": "sm",
        }
      : {};

  const imgAnims = animated
    ? {
        "hover-shadow": !IsMobile() && "7",
        "hover-scale": !IsMobile() && "lg",
      }
    : {};

  const imgMobileConfigs =
    IsMobile() && inViewport && animated
      ? {
          "transform-scale": "lg",
          "d-shadow": !IsMobile() && "7",
        }
      : {};

  const textOptions = {};

  textOptions[
    categories.filter(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    )[0].color
  ] = true;

  return (
    <CardContainer
      white
      h-100
      pw="xs"
      ph="xs"
      b-shadow="6"
      direction="c"
      ref={forwardedRef}
      {...containerAnims}
      {...containerMobileConfig}
      style={{ transition: "0.3s" }}
      onClick={onClick}
    >
      <Container
        h-45
        w-100
        b-shadow="6"
        style={{ maxHeight: "30rem", overflow: "hidden" }}
      >
        <CardImg
          src={img}
          ref={forwardedRef}
          {...imgMobileConfigs}
          {...imgAnims}
          style={{ transition: "0.5s" }}
        />
      </Container>
      <Container direction="c" h-40 w-100>
        <Container ph="sm" direction="c">
          <CardText
            {...textOptions}
            md
            hover-color="red"
            main
            h-1
            style={{ textAlign: "center" }}
          >
            {name}
          </CardText>
          <Text>{description}</Text>
          <CardText sm main>
            #{category}
          </CardText>
        </Container>
        <Container w-100 ph="xs">
          <CardText dark-red main sm hover-color="red">
            - entrar -
          </CardText>
        </Container>
      </Container>
    </CardContainer>
  );
};

export default Card;
