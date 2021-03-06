import React from "react";
import { Container, Img, Text, Configs } from "../../framework/assets";
import styled from "styled-components";
import { IsMobile } from "../../helpers/functions";

const CardContainer = styled(Container)`
  cursor: pointer;

  @media (max-width: 450px) {
    cursor: default;

    .price-text {
      font-size: .8rem;
    }
  }
`;

const CardImg = styled(Img)`
  /* min-width: 30rem; */
  @media (max-width: 1400px) {
    min-width: auto;
  }

  ${CardContainer}:hover & {
    ${Configs.HoverConfigs}
  }
`;

const Card = ({ product, inViewport, forwardedRef, animated, onClick }) => {
  const { price, name, category } = product;

  const img = product.images["x15"][0];

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
          "d-shadow": "7",
        }
      : {};

  const titleConfig = {
    md: name.length > 16 ? false : true,
  };

  return (
    <CardContainer
      direction="c"
      align="fs"
      ref={forwardedRef}
      mh="xs"
      style={{ maxWidth: "25rem", }}
      onClick={onClick}
    >
      <Container
      w-100
        style={{ overflow: "hidden", maxHeight: "30rem", maxWidth: "20rem" }}
      >
        <CardImg
        w-100
          src={img}
          ref={forwardedRef}
          {...imgMobileConfigs}
          {...imgAnims}
          hover-scale="lg"
          style={{ transition: "0.5s" }}
        />
      </Container>
      <Container w-100 direction="c" align="fs" sm-align="c">
        <Container
          w-100
          justify="fs"
          sm-justify="c"
          style={{ minHeight: "4rem" }}
        >
          <Text
            main
            {...titleConfig}
            sm-size="sm"
            red
            style={{
              fontSize: name.length > 12 && `28px`,
              textAlign: "center",
            }}
          >
            {name}
          </Text>
        </Container>
        <Text weight="light">{category}</Text>
        <Text
          className="price-text"
          sm
          ph="xs"
          weight="light"
          style={{ borderBottom: "1px solid" }}
        >
          ${price}
        </Text>
      </Container>
    </CardContainer>
  );
};

export default Card;
