import React, { useState, useRef, useEffect } from "react";
import { Container, Input, Img, Text } from "../../framework/assets";
import Navbar from "../modules/navbar";
import ProductsBoard from "../modules/products-board";
import { BringProducts } from "../store/db/products";
import { IsMobile, MaxWidth, randomizeArray } from "../../helpers/functions";
import search from "../../Assets/IMG/Various/icons/simple-search.svg";
import categories from "../store/db/categories";
import Acordeon from "../store/components/acordeon-menu";
import Loader from "../basics/loader";

const Store = () => {
  const [products, setDbProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("Todos los productos");
  const [filters, setFilters] = useState({});
  const SearchInput = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        filter: {
          name: 1,
          category: 1,
          price: 1,
          "images.x25": 1,
          "images.x15": 1,
        },
      };

      const fetchedProducts = await BringProducts(params);

      setDbProducts(
        randomizeArray(await fetchedProducts, fetchedProducts.length)
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(products);
  }, [products]);

  const StoreRef = useRef();

  const LaunchSearch = () => {
    if (!SearchInput.current.value) {
      setSearchValue("Todos los productos");
      return setSearchResult(products);
    }
    setSearchValue(SearchInput.current.value);
    const searchText = SearchInput.current.value.toLowerCase();
    setSearchResult(
      products.filter((product) => {
        const toSearchIn = JSON.stringify(
          product.name + product.tags + product.category
        ).toLowerCase();
        return toSearchIn.includes(searchText);
      })
    );
  };

  const handleFilters = async (e, key, value) => {
    if (e.target.checked) {
      setFilters(
        await { ...filters, [key]: await { ...filters[key], [value]: true } }
      );
    } else {
      setFilters(
        await { ...filters, [key]: await { ...filters[key], [value]: false } }
      );
    }
  };

  /* useEffect(() => {
    if (Object.keys(filters).length !== 0) {
      setSearchResult(
        searchResult.filter((el) => {
          for (let value in filters.category) {
            if (filters.category[value] === true) {
              return el.category === value;
            }
          }
        })
      );
    }
  }, [filters, searchResult]); */

  const navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "contacto", scroll: "contacto" },
  ];

  return (
    <div className="page" ref={StoreRef}>
      <Navbar bgColor="black" links={navbarLinks} />
      <Container h-100 direction="c" style={{ minHeight: "100vh" }}>
        <Container align="fe" ph="md" vh-30 w-100 style={{ zIndex: "2" }}>
          <Container direction="c" align="fs" pw="md" w-40>
            <Text>FMF Sneakers / Store</Text>
            <Text
              sm
              style={{ left: "0", bottom: "15%", textTransform: "capitalize" }}
            >
              {searchValue} ({searchResult.length})
            </Text>
          </Container>
          <Container w-60 justify="fs">
            <Container
              whitesmoke
              b-radius="xs"
              style={{
                border: "1.6px solid lightgray",
                overflow: "hidden",
                maxWidth: "20rem",
              }}
              justify="sb"
            >
              <Input
                ref={SearchInput}
                placeholder="Buscar..."
                w-100
                style={{
                  fontSize: "18px",
                  border: "0px",
                  padding: ".5rem .8rem",
                }}
              />
              <Container
                lightest-gray
                hover-bg="light-gray"
                w-16
                pw="xs"
                ph="xs"
                style={{ cursor: "pointer" }}
                onClick={() => LaunchSearch()}
              >
                <Img w-100 src={search} />
              </Container>
            </Container>
            <Text
              pw="xs"
              dark-gray
              hover-color="light-gray"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSearchResult(products) ||
                setSearchValue("Todos los productos")
              }
            >
              Reset
            </Text>
          </Container>
        </Container>
        <Container w-100 sm-direction="c" align="fs">
          <Container
            direction="c"
            justify="fs"
            pw="md"
            white
            w-20
            sm-w="w-100"
            style={{ minHeight: "100vh", zIndex: "1" }}
          >
            <Acordeon title="Categorías">
              {categories.map((op, idx) => {
                return (
                  <Container
                    key={idx}
                    w-100
                    justify="fs"
                    style={{ paddingTop: ".4rem" }}
                  >
                    <Input
                      type="checkbox"
                      onChange={(e) =>
                        handleFilters(e, "Category", categories[idx].name)
                      }
                    />
                    <Text pw="xs" style={{ fontSize: "18px" }}>
                      {op.name}
                    </Text>
                  </Container>
                );
              })}
            </Acordeon>
          </Container>
          {products.length !== 0 ? (
            <Container
              w-80
              sm-w="w-100"
              whitesmoke
              style={{ minHeight: "100vh" }}
            >
              <ProductsBoard
                products={searchResult}
                gap="2.5rem"
                simple
                style={{
                  padding: `2rem ${!MaxWidth(1000) ? "4rem" : "5rem"}`,
                  minHeight: "60vh",
                }}
                minSize={
                  (IsMobile() && "8rem") || (MaxWidth(1000) ? "10rem" : "16rem")
                }
                maxSize="1fr"
              />
            </Container>
          ) : (
            <Container vh-100 w-100>
              <Loader />
            </Container>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Store;
