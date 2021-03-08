import React from "react";
import { Container, Text } from "../../../framework/assets";
import Panel from "./panel";
import ProductsList from "./products-list";
import CategoriesList from "./categories-list";
import TopProducts from "./top-products";

const ProductsPanel = ({ panels }) => {
  const verifyPanel = (panel) => {
    return panels === panel
      ? "flex"
      : panels === "products_all"
      ? "flex"
      : "none";
  };

  return (
    <Container w-100 direction="c" justify="fs">
      <Container
        w-100
        ph="xs"
        style={{
          display: verifyPanel("products_categories"),
        }}
      >
        <Panel>
          <CategoriesList />
        </Panel>
      </Container>

      <Container
        w-100
        ph="xs"
        style={{
          display: verifyPanel("products_top"),
        }}
      >
        <Panel>
          <TopProducts />
        </Panel>
      </Container>

      <Container
        w-100
        ph="xs"
        style={{
          display: verifyPanel("products_products"),
        }}
      >
        <Panel>
          <ProductsList />
        </Panel>
      </Container>
    </Container>
  );
};

export default ProductsPanel;
