import React, { useState, useRef, useEffect } from "react";
import { Container, Text, Img, Input } from "../../../framework/assets";
import { colors } from "../../../framework/global";
import styled from "styled-components";
import editIcon from "../../../Assets/IMG/Various/icons/edit.svg";
import deleteIcon from "../../../Assets/IMG/Various/icons/delete.svg";
import search from "../../../Assets/IMG/Various/icons/simple-search.svg";
/* import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"; */
import { BringProducts } from "../../store/db/products";

const PanelContainer = styled(Container)`
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ProductsPanel = () => {
  const [dbProducts, setDbProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const SearchInput = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setDbProducts(await BringProducts({ limit: 2 }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(dbProducts);
  }, [dbProducts]);

  const LaunchSearch = () => {
    if (!SearchInput.current.value) {
      return setSearchResult(dbProducts);
    }
    const searchText = SearchInput.current.value.toLowerCase();
    setSearchResult(
      dbProducts.filter((product) => {
        const toSearchIn = JSON.stringify(
          product.name + product.tags + product.category
        ).toLowerCase();
        return toSearchIn.includes(searchText);
      })
    );
  };

  return (
    <Container w-100>
      {dbProducts && searchResult && (
        <Container direction="c" w-100>
          <Container ph="xs" w-100>
            <Container
              b-radius="xs"
              style={{
                border: "1.6px solid lightgray",
                overflow: "hidden",
              }}
              justify="sb"
            >
              <Input
                ref={SearchInput}
                placeholder="Buscar..."
                style={{
                  fontSize: "18px",
                  border: "0px",
                  padding: ".5rem .8rem",
                  maxWidth: "5rem",
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
              onClick={() => setSearchResult(dbProducts)}
            >
              Reset
            </Text>
            <Text style={{ position: "absolute", left: "0", bottom: "15%" }}>
              Total: {searchResult.length}
            </Text>
          </Container>
          <Container
            w-100
            whitesmoke
            style={{
              padding: ".7rem 3.5rem .7rem 2rem",
              border: `1px solid ${colors["lightest-gray"]}`,
            }}
          >
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Nombre:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Categoría:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Precio:</Text>
            </Container>
            <Container
              w-25
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Tags:</Text>
            </Container>
            <Container
              w-15
              style={{ borderRight: `2px solid ${colors["light-gray"]}` }}
            >
              <Text dark-gray>Cant Imagenes:</Text>
            </Container>
            <Container w-15>
              <Text dark-gray>Opciones:</Text>
            </Container>
          </Container>
          <PanelContainer
            w-100
            direction="c"
            style={{
              maxHeight: "25rem",
              minHeight: "25rem",
              overflowY: "scroll",
              display: "block",
              border: `1px solid ${colors["lightest-gray"]}`,
            }}
          >
            {searchResult.map((product, idx) => {
              return (
                <Container
                  bg={idx % 2 === 0 ? "white" : "whitesmoke"}
                  w-100
                  ph="sm"
                  pw="md"
                  justify="sb"
                  style={{
                    borderTop: `1px solid ${colors["lightest-gray"]}`,
                  }}
                  key={idx}
                >
                  <Container w-15>
                    <Text className="limited-text" main dark-red sm>
                      {product.name.toUpperCase()}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text
                      weight="light"
                      className="limited-text"
                      style={{ fontSize: "18px" }}
                    >
                      {product.category}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text
                      weight="light"
                      className="limited-text"
                      style={{ fontSize: "18px" }}
                    >
                      ${product.price}
                    </Text>
                  </Container>
                  <Container w-25>
                    <Text className="limited-text">
                      {product.tags.join(", ")}
                    </Text>
                  </Container>
                  <Container w-15>
                    <Text className="limited-text">
                      {product.images.x15.length}
                    </Text>
                  </Container>

                  <Container w-15 justify="sa">
                    <Container
                      w-20
                      hover-shadow="7"
                      hover-scale="md"
                      style={{ cursor: "pointer" }}
                    >
                      <Img src={editIcon} />
                    </Container>
                    <Container
                      w-20
                      hover-shadow="7"
                      hover-scale="md"
                      style={{ cursor: "pointer" }}
                    >
                      <Img src={deleteIcon} />
                    </Container>
                  </Container>
                </Container>
              );
            })}
          </PanelContainer>
        </Container>
      )}
    </Container>
  );
};

export default ProductsPanel;
