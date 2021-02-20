import React, { useState, useEffect, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Container, Text } from "../../framework/assets";
import Navbar from "../modules/navbar";
import ProductInfo from "../store/components/product-info-editable";
import ProductsBoard from "../modules/products-board";
import { BringProducts } from "../store/db/products";
import { CartProductRoute } from "../../helpers/functions";
import categories from "../store/db/categories";
import Politics from "../modules/politics";
import Loader from "../basics/loader";

import Gallery from "../modules/photoGallery";

import { randomizeArray } from "../../helpers/functions";

const ProductPage = () => {
  const [products, setDbProducts] = useState([]);
  const { pathname } = useLocation();
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setDbProducts(await BringProducts());
    };
    fetchData();
  }, []);

  useEffect(() => {
    products &&
      setProduct(
        products.find((prod) => "/" + CartProductRoute(prod) === pathname)
      );
  }, [products, product, pathname]);

  const category =
    product &&
    categories.find(
      (category) =>
        category.name.toLowerCase() === product.category.toLowerCase()
    );

  const navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
    { name: "info", scroll: "politics", offset: -47 },
    { name: "galería", scroll: "categoria" },
    { name: "contacto", scroll: "contacto" },
  ];

  return (
    <div className="page">
      <Navbar bgColor="black" links={navbarLinks} />
      <Suspense fallback={<Loader />}>
        {product && category ? (
          <Container direction="c">
            <ProductInfo data={product} />

            <Container w-100 black direction="c" id="categoria">
              <Container ph="md" style={{ paddingTop: "5rem" }}>
                <Text yellow main lg w-1 style={{ marginRight: "2rem" }}>
                  #
                </Text>
                <Text
                  xl
                  sm-size="md"
                  main
                  white
                  style={{ textAlign: "center" }}
                >
                  {category.name}
                </Text>
              </Container>
              <Text
                white
                w-60
                weight="light"
                ph="md"
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  wordSpacing: "3px",
                  textAlign: "center",
                  paddingTop: "0",
                }}
              >
                {category.description}
              </Text>
              <Container style={{ paddingBottom: "3rem", paddingTop: "2rem" }}>
                <Text
                  bg="yellow"
                  main
                  black
                  sm
                  style={{ padding: ".2rem 1rem" }}
                >
                  #FMFSneakers
                </Text>
              </Container>

              <Container w-100 ph="md">
                <Gallery
                  photos={products.filter(
                    (el) => el.category === product.category
                  )}
                  limit={10}
                />
              </Container>
            </Container>

            <Container whitesmoke align="fs" style={{ minHeight: "100vh" }}>
              <Politics />
            </Container>

            <Container
              w-100
              ph="lg"
              direction="c"
              align="c"
              b-shadow="inset-3"
              dark-gray
              bg-image="wall"
            >
              <Container
                w-50
                bg-image="wall1"
                b-shadow="inset-1"
                md-w="w-80"
                dark-red
                ph="sm"
                pw="md"
                d-shadow="7"
              >
                <Text
                  white
                  lg
                  sm-size="md"
                  main
                  style={{ textAlign: "center" }}
                >
                  Descubre más diseños
                </Text>
              </Container>
              <ProductsBoard
                products={randomizeArray(
                  products.filter(
                    (item) =>
                      item.category.toLowerCase() !==
                      category.name.toLowerCase()
                  ),
                  products.filter(
                    (item) =>
                      item.category.toLowerCase() !==
                      category.name.toLowerCase()
                  ).length
                )}
                styled
                animCards
                limit={4}
                minSize="18rem"
                maxSize="18rem"
                style={{ padding: "2rem 8rem", minHeight: "60vh" }}
              />
            </Container>
          </Container>
        ) : (
          <Container vh-100>
            <Loader />
          </Container>
        )}
      </Suspense>
    </div>
  );
};

export default ProductPage;
