import React from "react";
import { Container } from "../../framework/assets";
import styled from "styled-components";
import handleViewport from "react-in-viewport";
import StyledCard from "../basics/product-card-styled";
import SimpleCard from "../basics/product-card-store";
import { scrollTop, CartProductRoute } from "../../helpers/functions";

import { Link as RouteLink } from "react-router-dom";

const GridBoard = styled(Container)`
  display: grid;

  @media (max-width: 768px) {
  }

  @media (max-width: 420px) {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
`;

const Board = ({
  background,
  shadowed,
  products = [],
  limit,
  color,
  simple,
  styled,
  animCards = false,
  style,
  children,
  minSize,
  maxSize,
  gap,
}) => {
  const DetectCardStyle = () => {
    if (styled) {
      return StyledCard;
    }
    if (simple) {
      return SimpleCard;
    }
  };

  const viewPortOptions = {
    rootMargin: "0px",
    threshold: 0.8,
  };

  const ViewCard = handleViewport(DetectCardStyle(), viewPortOptions);

  return (
    <GridBoard
      bg={color}
      id="products"
      w-100
      bg-image={background}
      b-shadow={shadowed && "inset-1"}
      style={{
        ...style,
        gridTemplateColumns: `repeat(auto-fit, minmax(${minSize || "18rem"}, ${
          maxSize || "1fr"
        }))`,
        gridGap: gap || "2rem",
      }}
    >
      {children}
      {products.slice(0, limit).map((product, idx) => {
        let route = CartProductRoute(product);

        return (
          <RouteLink
            key={idx}
            to={`/${route}`}
            style={{ textDecoration: "none" }}
          >
            <ViewCard
              product={product}
              inViewport
              animated={animCards}
              onClick={scrollTop}
            />
          </RouteLink>
        );
      })}
    </GridBoard>
  );
};

export default Board;
