import React, { useState, useRef, useEffect } from "react";
import { Container, Input, Img, Text } from "../../framework/assets";
import { colors } from "../../framework/global";
import Navbar from "../modules/navbar";
import { BringProducts } from "../store/db/products";
import { randomizeArray } from "../../helpers/functions";
import search from "../../Assets/IMG/Various/icons/simple-search.svg";
import categories from "../store/db/categories";
import Acordeon from "../store/components/acordeon-menu";
import Loader from "../basics/loader";
import styled from "styled-components";

import FullStore from "../store/components/full-store/full-store";

const StoreContainer = styled(Container)`
  @media (max-width: 480px) {
    .search-tab {
      padding: 10rem 0 5rem 0;

      .reset {
        display: none;
      }

      .search-resume {
        padding: 2rem 0 0 0;
      }
    }
  }

  .page-link-container {
    min-width: 3.1rem;
    max-width: 3.1rem;
    min-height: 3.1rem;
    max-height: 3.1rem;
    border: 1px solid ${colors["light-gray"]};
  }
  .link-hover {
    :hover {
      background-color: ${colors["darkest-yellow"]};
      cursor: pointer;
      border-color: ${colors["darkest-yellow"]};
    }
  }

  @media (max-width: 700px) {
    .page-link,
    .page-link-container {
      margin: 0.1rem;

      font-size: 10px;

      * {
        font-size: 10px;
      }
    }

    .page-link-container {
      min-width: auto;
      min-height: auto;
    }
  }
`;

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
          tags: 1,
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

  const resetSearch = () => {
    setSearchResult(products);

    setSearchValue("Todos los productos");

    SearchInput.current.value = "";
    SearchInput.current.focus();
  };

  useEffect(() => {
    const FilteredByCategory = (selectedCategories) => {
      let filteredProducts = [];

      const sortArray = (array) => {
        const result = [];
        const selectedProducts = {};

        for (let j = 0; j <= selectedCategories.length; j++) {
          selectedProducts[selectedCategories[j]] = array.filter(
            (prod) => prod.category === selectedCategories[j]
          );
        }
        delete selectedProducts.undefined;

        for (let cat in selectedProducts) {
          result.push(...selectedProducts[cat]);
        }

        return result;
      };

      if (selectedCategories.length !== 0) {
        if (selectedCategories.length === 1) {
          filteredProducts = sortArray(searchResult);
        } else {
          filteredProducts = sortArray(products);
        }
      } else {
        filteredProducts = products;
      }

      return filteredProducts;
    };

    const selectedCategories = [];

    for (let cat in filters.Category) {
      if (filters.Category[cat]) {
        selectedCategories.push(cat);
      }
    }

    setSearchResult(FilteredByCategory(selectedCategories));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "categorías", route: "/categories" },
    { name: "contacto", scroll: "contacto", useLocomotive: true},
  ];

  return (
    <Container w-100 className="page" ref={StoreRef} data-scroll-section>
      <Navbar bgColor="black" links={navbarLinks} />
      <StoreContainer w-100 h-100 direction="c" style={{ minHeight: "100vh" }}>
        <Container
          align="fe"
          ph="md"
          vh-30
          w-100
          xs-direction="cr"
          className="search-tab"
          style={{ zIndex: "2" }}
        >
          <Container
            className="search-resume"
            direction="c"
            align="fs"
            xs-align="c"
            pw="md"
            w-40
            xs-w="w-100"
          >
            <Text>FMF Sneakers / Store</Text>
            <Text
              sm
              sm-size="xs"
              style={{
                left: "0",
                bottom: "15%",
                textTransform: "capitalize",
              }}
            >
              {searchValue} ({searchResult.length})
            </Text>
          </Container>
          <Container w-60 justify="fs" xs-justify="c" xs-w="w-100">
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
              className="reset"
              pw="xs"
              dark-gray
              hover-color="light-gray"
              style={{ cursor: "pointer" }}
              onClick={() => resetSearch()}
            >
              Reset
            </Text>
          </Container>
        </Container>
        <Container w-100 sm-direction="c" align="fs">
          <Container direction="c" justify="fs" pw="md" white w-20 sm-w="w-100">
            <Acordeon title="Categorías">
              {categories
                .filter((cat) => !cat.hideOnSearch)
                .map((op, idx) => {
                  return (
                    <Container
                      key={idx}
                      w-100
                      justify="fs"
                      style={{ paddingTop: ".4rem" }}
                    >
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          setTimeout(() => {
                            handleFilters(e, "Category", categories[idx].name);
                          }, 500);
                        }}
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
              direction="c"
              id="products-board"
            >
              <FullStore products={searchResult} />
            </Container>
          ) : (
            <Container vh-100 w-100>
              <Loader />
            </Container>
          )}
        </Container>
      </StoreContainer>
    </Container>
  );
};

export default Store;
