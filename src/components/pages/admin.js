import React, { useState } from "react";
import { Container, Text, Configs } from "../../framework/assets";
import styled from "styled-components";
import Navbar from "../modules/navbar";
import ProductsPanel from "../admin/components/products/products-panel";
import OrdersPanel from "../admin/components/orders/orders-panel";
import SuscriptionsPanel from "../admin/components/suscriptions/suscriptions-panel";
import OptionDesplegable from "../admin/components/option-desplegable";
import { useHistory } from "react-router-dom";
import { UseLocalStorage } from "../../helpers/customHooks";

const AdminPageContainer = styled(Container)`
  min-height: 100vh;

  .desplegable-option {
    font-weight: 300;
    padding: ${Configs.Sizes.xs};
    cursor: pointer;

    :hover {
      transform: scale(1.2);
      color: ${Configs.Colors["dark-gray"]};
    }
  }
`;

const AdminPage = () => {
  const [panelToShow, setPanelToShow] = UseLocalStorage("panel_to_show", "products_products");

  let navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
  ];

  const history = useHistory();

  const LogOut = () => {
    history.push("/login");
    localStorage.removeItem("isAuth");
  };

  return (
    <AdminPageContainer
      whitesmoke
      direction="c"
      bg-image="wall2"
      className="page"
      data-scroll-section
    >
      <Container w-100 d-shadow="8" style={{ zIndex: "100" }}>
        {/* <Navbar
          showCart={false}
          bgColor="black"
          fixed={false}
          links={navbarLinks}
        /> */}
      </Container>

      <Container w-100 justify="fe">
        <Container
          w-15
          black
          d-shadow="8"
          direction="c"
          justify="fs"
          style={{ position: "absolute", top: "0", bottom: "0", left: "0" }}
        >
          <Container w-100 ph="md" mh="xs" yellow>
            <OptionDesplegable title="Productos">
              <Container direction="c" align="fs" ph="sm">
                <Text
                  className="desplegable-option"
                  onClick={() => setPanelToShow("products_categories")}
                >
                  Categorías
                </Text>
                <Text
                  className="desplegable-option"
                  onClick={() => setPanelToShow("products_top")}
                >
                  Top
                </Text>
                <Text
                  className="desplegable-option"
                  onClick={() => setPanelToShow("products_products")}
                >
                  Todos los Productos
                </Text>
                <Text
                  className="desplegable-option"
                  onClick={() => setPanelToShow("products_all")}
                >
                  Todo
                </Text>
              </Container>
            </OptionDesplegable>
          </Container>

          <Container w-100 ph="md" mh="xs" yellow>
            <OptionDesplegable title="Pedidos">
              <Text
                className="desplegable-option"
                onClick={() => setPanelToShow("orders_all")}
              >
                Ver Pedidos
              </Text>
            </OptionDesplegable>
          </Container>

          <Container w-100 ph="md" mh="xs" yellow>
            <OptionDesplegable title="Suscripciones">
              <Text
                className="desplegable-option"
                onClick={() => setPanelToShow("suscriptions_all")}
              >
                Ver Suscripciones
              </Text>
            </OptionDesplegable>
          </Container>


          <Container w-100 ph="md" mh="xs" yellow>
            <OptionDesplegable title="Salir">
              <Text className="desplegable-option" onClick={() => LogOut()}>
                Cerrar Sesión
              </Text>
            </OptionDesplegable>
          </Container>
        </Container>

        {/* Panels */}
        <Container
          w-85
          ph="sm"
          pw="sm"
          direction="c"
          style={{ minHeight: "100vh" }}
        >
          <ProductsPanel panels={panelToShow} />
          <OrdersPanel panels={panelToShow} />
          <SuscriptionsPanel panels={panelToShow} />
        </Container>
      </Container>
    </AdminPageContainer>
  );
};

export default AdminPage;
