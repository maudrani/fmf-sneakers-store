import React, { useState } from "react";
import { Container } from "../../framework/assets";
import ProductsBoard from "../modules/products-board";
import ProductModal from "../basics/product-modal";
import sneakers from "../store/db/sneakers";

const Store = () => {
  const [searchResult, setSearchResult] = useState(sneakers);
  const [modalData, setModalData] = useState({ launched: false, product: {} });

  const HandleChange = (e) => {
    if (!e.target.value) {
      return setSearchResult(sneakers);
    }

    const searchText = e.target.value.toLowerCase();

    setSearchResult(
      sneakers.filter((product) => {
        const toSearchIn = JSON.stringify(
          product.name + product.tags + product.description + product.price
        ).toLowerCase();
        return toSearchIn.includes(searchText);
      })
    );
  };

  return (
    <Container className="page" h-100 direction="c">
      <ProductModal
        launched={modalData.launched}
        setLaunched={setModalData}
        data={modalData.product}
      />
      <Container vh-30 w-100 black>
        <input type="text" onChange={HandleChange} />
      </Container>
      <ProductsBoard
        products={searchResult}
        simple
        background="wall2"
        style={{ padding: "2rem 10rem" }}
        launchModal={setModalData}
      />
    </Container>
  );
};

export default Store;
