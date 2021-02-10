import React from "react";
import { Container, Img, Text } from "../../framework/assets";
import sneaker from "../../Assets/IMG/Products/demo/sneaker2.webp";
import products from "../store/db/products";
import ProductsBoard from "./products-board";

import { getRandom } from "../../helpers/functions";

const Promo = () => {
  return (
    <Container direction="c" id="diseños">
      <Container md-direction="c" w-100 style={{ minHeight: "105vh" }}>
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
          <Img alt="sneaker promo image" src={sneaker} d-shadow="7" />
        </Container>
      </Container>
      <Container
        lightest-gray
        w-100
        pw="lg"
        ph="xl"
        bg-image="wall"
        b-shadow="inset-1"
        style={{ minHeight: "100vh" }}
      >
        <ProductsBoard
          products={getRandom(products, products.length)}
          styled
          animCards
          limit={4}
        />
      </Container>
    </Container>
  );
};

export default Promo;
