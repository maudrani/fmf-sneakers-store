import React from "react";
import { Container, Text, Button, Img } from "../../framework/assets";
import styled from "styled-components";

const Background = styled(Container)`
  z-index: 90;
  position: fixed;
  background-color: rgba(28, 28, 28, 0.8);

  @media (max-width: 410px) {
    padding: 20% 0rem;
  }
`;

const ModalContainer = styled(Container)`
  @media (max-width: 768px) {
    height: auto;
    text-align: center;
  }
`;

const ModalInfo = styled(Container)`
  @media (max-width: 1135px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductModal = ({ launched, setLaunched, data }) => {
  return (
    <Background
      h-100
      w-100
      ph="lg"
      align="fs"
      style={{
        display: launched ? "flex" : "none",
        opacity: launched ? "1" : "0",
      }}
    >
      <ModalContainer
        whitesmoke
        w-75
        md-w="w-99"
        vh-90
        sm-direction="c"
        b-radius="xs"
      >
        <Container
          hover-scale="md"
          whitesmoke
          style={{
            position: "absolute",
            top: "1%",
            right: "1%",
            borderRadius: "50vh",
            zIndex: "90",
            height: "2rem",
            width: "2rem",
            paddingBottom: "0.3rem",
            cursor: "pointer",
          }}
          onClick={() => setLaunched({ launched: false, product: {} })}
        >
          <Text md weight="light">
            &times;
          </Text>
        </Container>
        <Container
          w-65
          h-100
          sm-w="w-100"
          b-radius="xs"
          style={{ overflow: "hidden" /*  maxHeight: "100rem" */ }}
        >
          <Img src={data.img} style={{ maxHeight: "90vh" }} />
        </Container>
        <ModalInfo w-35 h-100 ph="lg" pw="md" direction="c" lg-w="w-45">
          <Text w-100 main xl red md-size="lg">
            {data.name}
          </Text>
          <Text w-100 xs weight="light">
            {data.description}
          </Text>
          <Container w-100 ph="sm" justify="fs" sm-justify="c">
            <Text sm weight="light">
              1 2 3 4 5
            </Text>
          </Container>
          <Text w-100 weight="light" md md-size="sm">
            $ {data.price}
          </Text>
          <Container w-100 ph="xs" direction="c" align="fs" sm-align="c">
            <Text weight="light" ph="xs">
              Size
            </Text>
            <Text weight="light" sm>
              1 - 2 - 3 - 4
            </Text>
          </Container>
          <Container w-100 direction="c" align="s" sm-align="c">
            <Container w-80 sm-w="w-60">
              <Button
                w-100
                mh="xs"
                ph="xs"
                pw="xs"
                bg="black"
                whitesmoke
                weight="bold"
                hover-scale="sm"
              >
                ADD TO CART
              </Button>
            </Container>
            <Container w-80>
              <Button
                w-100
                ph="xs"
                pw="xs"
                weight="bold"
                hover-scale="sm"
                onClick={() => setLaunched({ launched: false, product: {} })}
              >
                Cancel
              </Button>
            </Container>
          </Container>
        </ModalInfo>
      </ModalContainer>
    </Background>
  );
};

export default ProductModal;
