import React from "react";
import { Container, Img, Text, Configs } from "../../framework/assets";
import styled from "styled-components";
import categories from "../store/db/categories";
import { IsMobile } from "../../helpers/functions";
import Loader from "./loader";

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

  const img = IsMobile() ? product.images.x15[0] : product.images.x15[0];

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

  const imgAnims = {
    "hover-shadow": !IsMobile() && "7",
    "hover-scale": !IsMobile() && "lg",
  };
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
      b-shadow="5"
      direction="c"
      ref={forwardedRef}
      {...containerAnims}
      {...containerMobileConfig}
      style={{ transition: "0.3s" }}
      onClick={onClick}
    >
      <Container
        w-100
        b-shadow="6"
        style={{ maxHeight: "100%", overflow: "hidden" }}
      >
        {img ? (
          <CardImg
            src={img}
            ref={forwardedRef}
            {...imgMobileConfigs}
            {...imgAnims}
            style={{ transition: "0.5s" }}
          />
        ) : (
          <Container ph='md'>
            <Loader />
          </Container>
        )}
      </Container>
      <Container direction="c" w-100>
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
