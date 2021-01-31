import React from "react";
import { Container } from "../../framework/assets";
import ProductsBoard from "../modules/products-board";
import sneakers from "../store/db/sneakers";

const Store = () => {
  return (
    <Container className="page">
      <ProductsBoard
        products={sneakers}
        simple
        background="wall2"
        style={{ padding: "5rem 10rem" }}
      />
    </Container>
  );
};

export default Store;
