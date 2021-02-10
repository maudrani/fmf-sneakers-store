import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import styled from "styled-components";

import { Link as RouteLink } from "react-router-dom";

const Tag = styled(Text)`
  margin-bottom: 0.5rem;
  font-size: 14px;
  color: rgb(160, 160, 160);
`;

const ImgContainer = styled(Container)`
  max-height: 10rem;
  overflow: hidden;
  @media (max-width: 768px) {
    max-height: 8.5rem;
  }
`;

const ProductCardSmall = ({ product, onClick }) => {
  let route =
    product.name.toLowerCase().replace(" ", "-") + "/id:" + product.id;

  return (
    <Container direction="c" w-100 onClick={onClick}>
      <Container w-100 align="fs" direction="c">
        <RouteLink to={`/${route}`} style={{ textDecoration: "none" }}>
          <Text main md red sm-size="sm">
            {product.name} - 
          </Text>
        </RouteLink>
      </Container>

      <Container w-100>
        <ImgContainer w-25 sm-w="w-30">
          <RouteLink to={`/${route}`} style={{ textDecoration: "none" }}>
            <Img alt='sneaker image' src={product.images.x15[0]} style={{ minWidth: "9rem" }} />
          </RouteLink>
        </ImgContainer>

        <Container direction="c" justify="sb" w-75>
          <Container
            w-100
            justify="sb"
            ph="xs"
            style={{
              borderBottom: "1px solid rgba(0,0,0, 0.1)",
              borderTop: "1px solid rgba(0,0,0, 0.1)",
            }}
          >
            <Container direction="c" w-25 sm-w="w-30">
              <Tag>Talle</Tag>
              <Text weight="light" sm sm-size="xs">
                {product.size}
              </Text>
            </Container>

            <Container direction="c" w-25 sm-w="w-30">
              <Tag>Cant</Tag>
              <Text weight="light" sm sm-size="xs">
                {product.quantity}
              </Text>
            </Container>

            <Container direction="c" w-50 sm-w="w-40">
              <Tag>Calidad</Tag>
              <Text
                w-100
                weight="light"
                sm
                sm-size="xs"
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {product.quality.name}
              </Text>
            </Container>
          </Container>

          <Container
            w-100
            justify="fe"
            sm-justify="sb"
            style={{ borderBottom: "1px solid rgba(0,0,0, 0.1)" }}
          >
            <Container w-50 sm-w="w-60">
              <Text weight="light" sm sm-size="xs">
                Total:
              </Text>
            </Container>
            <Container
              w-50
              sm-w="w-40"
              ph="xs"
              lightest-gray
            >
              <Text weight="light" sm sm-size="xs">
                ${product.total}
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProductCardSmall;
