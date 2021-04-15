import React, { useState, useEffect } from "react";
import { Container, Text, Configs } from "../../../../framework/assets";
import categories from "../../../store/db/categories";
import styled from "styled-components";
import { BringProducts } from "../../../store/db/products";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PanelContainer = styled(Container)`
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const CategoriesList = () => {
  const { Colors } = Configs;
  const [dbProducts, setDbProducts] = useState([]);
  const MySwal = withReactContent(Swal);

  const fetchData = async () => {
    const params = {
      filter: { category: 1 },
    };
    setDbProducts(await BringProducts(params));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showDescription = (category) => {
    MySwal.fire({
      width: "63%",
      html: (
        <Container w-100 ph="md" pw="ms" direction="c" black>
          <Text
            main
            md
            ph="md"
            {...{
              [category.color === "black"
                ? "whitesmoke"
                : category.color]: true,
            }}
          >
            #{category.name}
          </Text>
          <Text
            w-65
            whitesmoke
            sm
            weight="thin"
            style={{ textAlign: "center", lineHeight: "1.4em" }}
          >
            {category.description}
          </Text>
        </Container>
      ),
      confirmButtonText: (
        <Text white sm>
          Cerrar
        </Text>
      ),
      confirmButtonColor: Colors["dark-gray"],
    });
  };

  return (
    <PanelContainer w-100 direction="c" align="fs">
      <Text main md ph="xs">
        Categorías
      </Text>
      <Text ph="xs">Total: {categories.length}</Text>
      <Container w-100 direction="c">
        <Container
          w-100
          whitesmoke
          style={{
            padding: ".7rem 0rem .7rem 0rem",
            border: `1px solid ${Colors["lightest-gray"]}`,
          }}
        >
          <Container
            w-25
            style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
          >
            <Text dark-gray>Nombre:</Text>
          </Container>
          <Container
            w-25
            style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
          >
            <Text dark-gray>Cant Productos:</Text>
          </Container>
          <Container w-50>
            <Text dark-gray>Descripción:</Text>
          </Container>
        </Container>

        <Container
          w-100
          style={{
            display: "block",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {categories.map((cat, idx) => (
            <Container
              key={idx}
              w-100
              ph="xs"
              justify="sb"
              style={{
                backgroundColor: idx % 2 === 0 ? "white" : "whitesmoke",
              }}
            >
              <Container w-25>
                <Text
                  main
                  sm
                  {...{
                    [cat.color === "whitesmoke"
                      ? "light-gray"
                      : cat.color]: true,
                  }}
                >
                  {cat.name}
                </Text>
              </Container>
              <Container w-25>
                <Text>
                  {
                    dbProducts.filter((prod) => prod.category === cat.name)
                      .length
                  }
                </Text>
              </Container>
              <Container w-50>
                <Text className="limited-text" pw="xs">
                  {cat.description}
                </Text>
                <Container
                  b-shadow="5"
                  black
                  hover-scale="sm"
                  hover-bg="dark-gray"
                  style={{
                    padding: ".5rem 1rem",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => showDescription(cat)}
                >
                  <Text white>Ver</Text>
                </Container>
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
    </PanelContainer>
  );
};

export default CategoriesList;
