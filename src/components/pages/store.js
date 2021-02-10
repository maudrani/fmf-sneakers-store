import React, { useState, useRef } from "react";
import { Container, Input } from "../../framework/assets";
import Navbar from "../modules/navbar";
import ProductsBoard from "../modules/products-board";
import sneakers from "../store/db/products";

const Store = () => {
  const [searchResult, setSearchResult] = useState(sneakers);
  const StoreRef = useRef();
  const HandleChange = (e) => {
    if (!e.target.value) {
      return setSearchResult(sneakers);
    }
    const searchText = e.target.value.toLowerCase();
    setSearchResult(
      sneakers.filter((product) => {
        const toSearchIn = JSON.stringify(
          product.name + product.tags + product.category
        ).toLowerCase();
        return toSearchIn.includes(searchText);
      })
    );
  };

  const navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "contacto", scroll: "contacto" },
  ];

  return (
    <div ref={StoreRef}>
      <Navbar bgColor="black" links={navbarLinks} />
      <Container h-100 direction="c" style={{ minHeight: "100vh" }}>
        <Container white vh-30 w-100>
          <Input
            black
            sm
            type="text"
            onChange={HandleChange}
            placeholder="Buscar"
            weight="light"
            spellCheck="false"
            style={{ padding: ".5rem 0" }}
          />
        </Container>
        <Container
          w-100
          whitesmoke
          bg-image={"wall2"}
          style={{ minHeight: "100vh" }}
        >
          <ProductsBoard
            products={searchResult}
            simple
            style={{ padding: "2rem 10rem", minHeight: "60vh" }}
            minSize="16rem"
            maxSize="1fr"
          />
        </Container>
      </Container>
    </div>
  );
};

export default Store;
