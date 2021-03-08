import React, { useState, useEffect } from "react";
import { Container, Text, Configs } from "../../../framework/assets";

import styled from "styled-components";
import { BringProducts } from "../../store/db/products";

const PanelContainer = styled(Container)`
  * {
    text-align: center;
  }
  .limited-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const TopProducts = () => {
  const [dbProducts, setDbProducts] = useState([]);
  const fetchData = async () => {
    const params = {
      filter: { name: 1, visits: 1, total_boughts: 1 },
    };
    setDbProducts(await BringProducts(params));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { Colors } = Configs;

  return (
    <PanelContainer w-100 direction="c" align="fs">
      <Text main md dark-yellow ph="xs">
        Top de productos
      </Text>
      <Text ph="xs">
        Detalle completo en <strong>Productos {">"} Top de Productos</strong>
      </Text>
      <Container
        w-100
        whitesmoke
        style={{
          padding: ".7rem 0rem .7rem 0rem",
          border: `1px solid ${Colors["lightest-gray"]}`,
        }}
      >
        <Container
          w-33
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Nombre:</Text>
        </Container>
        <Container
          w-33
          style={{ borderRight: `2px solid ${Colors["light-gray"]}` }}
        >
          <Text dark-gray>Cant Visitas:</Text>
        </Container>
        <Container w-33>
          <Text dark-gray>Cant Ventas:</Text>
        </Container>
      </Container>

      <Container
        w-100
        direction="c"
        style={{ display: "block", overflowY: "auto", maxHeight: "60vh" }}
      >
        {dbProducts.map((prod, idx) => (
          <Container
            key={idx}
            w-100
            ph="xs"
            {...{ whitesmoke: idx % 2 === 1 ? true : false }}
          >
            <Container w-33>
              <Text main sm>
                {prod.name}
              </Text>
            </Container>
            <Container w-33>
              <Text>{prod.visits || 0}</Text>
            </Container>
            <Container w-33>
              <Text>{prod.total_boughts || 0}</Text>
            </Container>
          </Container>
        ))}
      </Container>
    </PanelContainer>
  );
};

export default TopProducts;
