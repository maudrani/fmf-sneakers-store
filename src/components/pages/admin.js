import React from "react";
import { Container, Text } from "../../framework/assets";
import Panel from "../admin/components/panel";
import styled from "styled-components";
import Navbar from "../modules/navbar";
import ProductsPanel from "../admin/components/products-panel";

const AdminPageContainer = styled(Container)`
  min-height: 100vh;
`;

const AdminPage = () => {
  let navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
  ];

  return (
    <AdminPageContainer whitesmoke direction="c" bg-image="wall2">
      <Container w-100 d-shadow="8" style={{ zIndex: "100" }}>
        <Navbar
          showCart={false}
          bgColor="black"
          fixed={false}
          links={navbarLinks}
        />
      </Container>
      <Container w-100>
        <Container w-15 vh-100 darkest-yellow d-shadow="8" direction="c">
          <Container ph="md">
            <Text>Productos</Text>
          </Container>
        </Container>

        <Container w-85 vh-100 ph="sm" pw="sm" style={{ marginTop: "-4rem" }}>
          <Panel>
            <Container
              w-100
              direction="c"
              justify="sb"
              style={{ minHeight: "80vh" }}
            >
              <Container w-100 direction="c">
                <Container w-100 justify="fs">
                  <Text md main>
                    Productos
                  </Text>
                </Container>
                <Container></Container>
              </Container>

              <Container w-100>
                <ProductsPanel />
              </Container>
            </Container>
          </Panel>
        </Container>
      </Container>
    </AdminPageContainer>
  );
};

export default AdminPage;
