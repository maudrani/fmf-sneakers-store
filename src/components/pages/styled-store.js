import React, { useState, useEffect } from "react";
import { Container } from "../../framework/assets";
import Navbar from "../modules/navbar";
import styled from "styled-components";
import StyledCategories from "../store/components/styled-store-categories";
import { BringProducts } from "../store/db/products";
import { IsMobile, randomizeArray } from "../../helpers/functions";
import Promo from "../store/components/promos";

const StoreMain = styled(Container)``;

const StyledStore = () => {
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
      { name: "contacto", scroll: "contacto" },
    ],
  };

  return (
    <div className="page">
      <Navbar {...navbarConfig} />
      <StoreMain
        direction="c"
        justify="fs"
        className="page"
        dark-gray
        bg-image="wall"
      >
        <StyledCategories products={products} />
        <Promo promo={3} />
      </StoreMain>
    </div>
  );
};

export default StyledStore;