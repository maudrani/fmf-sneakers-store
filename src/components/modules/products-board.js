import React from "react";
import { Container } from "../../framework/assets";
import styled from "styled-components";
import handleViewport from "react-in-viewport";
import StyledCard from "../basics/product-card-1";
import SimpleCard from "../basics/product-card-2";

const Board = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 2rem;

  @media (max-width: 420px) {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
`;

const ProductsBoard = ({
  background,
  shadowed,
  products = [],
  limit,
  color,
  simple,
  styled,
  animCards = false,
  style,
}) => {
  const DetectCardStyle = () => {
    if (styled) {
      return StyledCard;
    }
    if (simple) {
      return SimpleCard;
    }
  };

  return (
    <Board
      bg={color}
      id="products"
      pw="lg"
      ph="lg"
      w-100
      bg-image={background}
      b-shadow={shadowed && "inset-1"}
      style={{ ...style }}
    >
      {products.slice(0, limit).map((card, idx) => {
        const viewOptions = {
          rootMargin: "0px",
          threshold: 0.8,
        };

        const ViewCard = handleViewport(DetectCardStyle(), viewOptions);
        return (
          <ViewCard product={card} key={idx} inViewport animated={animCards} />
        );
      })}
    </Board>
  );
};

export default ProductsBoard;
