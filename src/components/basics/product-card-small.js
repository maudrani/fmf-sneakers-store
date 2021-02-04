import React from "react";
import { Container, Text, Img } from "../../framework/assets";
import styled from "styled-components";

const Tag = styled(Text)`
  margin: 0.5rem 0;
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

const ProductCardSmall = ({ product }) => {
  return (
    <Container direction="c" w-100 ph="xs">
      <Container w-100 justify="fs" ph="xs">
        <Text main md red>
          {product.name}
        </Text>
      </Container>

      <Container w-100>
        <ImgContainer w-25 sm-w="w-30">
          <Img src={product.img} style={{ minWidth: "9rem" }} />
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
              style={{ backgroundColor: "rgba(180,180,180,0.2)" }}
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
