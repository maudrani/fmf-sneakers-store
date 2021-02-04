import React, { useState, useEffect, useRef } from "react";
import { Container, Input } from "../../framework/assets";
import Navbar from "../modules/navbar";
import Contact from "../modules/contact";
import Footer from "../modules/footer";
import ProductsBoard from "../modules/products-board";
import ProductModal from "../basics/product-modal";
import sneakers from "../store/db/sneakers";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Store = () => {
  const [searchResult, setSearchResult] = useState(sneakers);
  const [modalData, setModalData] = useState({ launched: false, product: {} });

  const StoreRef = useRef();

  useEffect(() => {
    modalData.launched
      ? disableBodyScroll(StoreRef)
      : enableBodyScroll(StoreRef);
  }, [modalData.launched]);

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

  return (
    <div ref={StoreRef}>
      <Navbar />
      <Container
        optimize-scroll={modalData.launched && "none"}
        className={!modalData.launched && "page"}
        h-100
        direction="c"
        bg-image="wall2"
      >
        <ProductModal
          launched={modalData.launched}
          setLaunched={setModalData}
          data={modalData.product}
        />
        <Container whitesmoke vh-30 w-100>
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
        <ProductsBoard
          products={searchResult}
          simple
          style={{ padding: "2rem 10rem", minHeight: "60vh" }}
          launchModal={setModalData}
        />
      </Container>
      <Contact />
      <Footer />
    </div>
  );
};

export default Store;
