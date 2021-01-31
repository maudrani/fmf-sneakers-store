import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/Products/sneaker2.webp";
import sneakers from "../store/db/sneakers2";
import ProductsBoard from "./products-board";

const Promo = () => {
  return (
    <Container direction="c" id="designs">
      <Container md-direction="c" w-100 style={{minHeight: '105vh'}}>
        <Container
          w-50
          md-w="w-100"
          pw="lg"
          ph="md"
          style={{ textAlign: "center" }}
        >
          <Text lg main>
            <Text red lg main>
              Descubrí
            </Text>{" "}
            nuestros diseños
          </Text>
        </Container>

        <Container w-50 md-w="w-100" pw="lg" ph="sm">
          <Img src={sneaker} d-shadow="7" />
        </Container>
      </Container>
      <ProductsBoard products={sneakers} background="wall" styled animCards limit={4} style={{minHeight: '100vh'}} shadowed/>
    </Container>
  );
};

export default Promo;
