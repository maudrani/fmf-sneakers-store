import React, { useState } from "react";
import { Container } from "../../framework/assets";
import styled from "styled-components";
import handleViewport from "react-in-viewport";
import StyledCard from "../basics/product-card-styled";
import SimpleCard from "../basics/product-card-store";
import { scrollTop, CartProductRoute } from "../../helpers/functions";
import { useLocomotiveScroll } from "react-locomotive-scroll";

import { Link as RouteLink } from "react-router-dom";

const GridBoard = styled(Container)`
  display: grid;

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
  showPagination = false,
  itemsPerPage = 6,
  currentPage = 1,
  setAmountOfPages,
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

  const createPages = (array, pageLength) => {
    let page = [];
    let pages = [];

    let totalItemsInEqualPages = 0;

    array.forEach((el, idx) => {
      page.push(el);
      if ((idx + 1) % pageLength === 0) {
        pages.push(page);
        page = [];
        totalItemsInEqualPages += pageLength;
      }
    });

    const lastItems = [];

    for (let i = 0; i < array.length - totalItemsInEqualPages; i++) {
      lastItems.push(array[totalItemsInEqualPages + i]);
    }

    /* pages.push(array.splice(totalItemsInEqualPages, array.length)); */
    pages.push(lastItems);

    setAmountOfPages(pages.length);

    let actualPage = [];

    if (pages[currentPage - 1] !== undefined) {
      actualPage = pages[currentPage - 1];
    } else {
      actualPage = pages[0];
    }

    return actualPage.map((product, idx) => {
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
    });
  };

  const { scroll } = useLocomotiveScroll();

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

      {showPagination && createPages(products, itemsPerPage)}

      {!showPagination &&
        products.slice(0, limit).map((product, idx) => {
          let route = CartProductRoute(product);

          return (
            <RouteLink
              key={idx}
              to={`/${route}`}
              style={{ textDecoration: "none" }}
              onClick={() => scroll.scrollTo("top", { duration: 10 })}
            >
              <ViewCard
                product={product}
                inViewport
                animated={animCards}
                onClick={() => scroll.scrollTo("top") || scrollTop}
              />
            </RouteLink>
          );
        })}
    </GridBoard>
  );
};

export default Board;
