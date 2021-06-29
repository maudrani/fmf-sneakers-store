import React, { useState, useEffect } from "react";
import { Container } from "../../framework/assets";
import Navbar from "../modules/navbar";
import styled from "styled-components";
import StyledCategories from "../store/components/styled-store-categories";
import { BringProducts } from "../store/db/products";
import { IsMobile, randomizeArray } from "../../helpers/functions";

const StoreMain = styled(Container)``;

const StyledStore = ({setShowContact}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await BringProducts();

      setProducts(
        randomizeArray(await fetchedProducts, fetchedProducts.length)
      );
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navbarConfig = {
    fixed: IsMobile() ? false : true,
    bgColor: "black",
    logoColor: "white",
    textColor: "white",
    links: [
      { name: "inicio", route: "/" },
      { name: "store", route: "/store" },
      { name: "contacto", scroll: "contacto", useLocomotive: true },
    ],
  };

  useEffect(() => {
    setShowContact(true);
  }, [setShowContact]);

  return (
    <Container
      w-100
      className="page"
      style={{ display: "block" }}
      data-scroll-section
    >
      <Navbar {...navbarConfig} />

      <StoreMain
        direction="c"
        justify="fs"
        className="page"
        dark-gray
        bg-image="wall"
      >
        <StyledCategories products={products} />
      </StoreMain>
    </Container>
  );
};

export default StyledStore;
