import React, { useContext, useEffect, useState } from "react";
import { Container, Text } from "../../framework/assets";
import CartSummary from "../store/components/cart-summary";
import Navbar from "../modules/navbar";
import { CartContext } from "../context/cart-context";
import { colors, sizes } from "../../framework/global";

import styled from "styled-components";

const CartSummaryContainer = styled(Container)`
  @media (max-width: 768px) {
    padding: 0 0.1rem;
  }
`;

const ResumeContainer = styled(Container)`
  margin-bottom: 5rem;

  @media (max-width: 1258px) {
    * {
      font-size: 20px;
    }
  }

  @media (max-width: 990px) {
    margin-top: 5rem;

    * {
      font-size: ${sizes.sm};
    }
  }

  @media (max-width: 390px) {
    * {
      font-size: 16px;
    }
  }
`;

const CartContainer = styled(Container)``;

const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  const [subtotalCartValue, setSubTotal] = useState(0);

  const navbarLinks = [
    { name: "inicio", route: "/" },
    { name: "store", route: "/store" },
    { name: "contacto", scroll: "contacto" },
  ];

  useEffect(() => {
    let value = 0;

    cart.map((product) => (value += product.total));

    setSubTotal(value);
  }, [cart]);

  return (
    <div style={{ minHeight: "80vh" }}>
      <Navbar bgColor="black" links={navbarLinks} />
      <Container direction="c" w-100>
        <Container
          w-90
          pw="xs"
          justify="fs"
          align="fe"
          style={{ marginBottom: ".5rem", marginTop: "5rem" }}
        >
          <Text lg main md-size="md" darkest-yellow>
            Carrito
          </Text>
        </Container>

        <CartContainer w-90 align="fs" md-align="c" md-direction="c">
          <CartSummaryContainer w-70 md-w="w-99" pw="sm">
            <Container w-100 direction="c">
              <CartSummary cart={cart} setCart={setCart} />
            </Container>
          </CartSummaryContainer>

          {cart.length !== 0 && (
            <ResumeContainer w-30 md-w="w-95" direction="c" justify="fs">
              <Container w-100 direction="c" lightest-gray b-shadow="2">
                <Container
                  w-100
                  justify="fs"
                  style={{ borderBottom: `1px solid ${colors["light-gray"]}` }}
                >
                  <Text sm pw="sm" ph="sm">
                    Resumen de Compra
                  </Text>
                </Container>

                <Container w-100 direction="c" justify="fs" pw="sm" ph="md">
                  <Container w-100 justify="sb" ph="xs">
                    <Text weight="light" sm>
                      Subtotal ({cart.length} items)
                    </Text>
                    <Text sm weight="light">
                      {" "}
                      ${subtotalCartValue}
                    </Text>
                  </Container>
                  <Container w-100 justify="sb" ph="xs">
                    <Text weight="light" sm>
                      ...
                    </Text>
                    <Text sm weight="light">
                      {" "}
                      ${"-"}
                    </Text>
                  </Container>
                </Container>

                <Container
                  w-100
                  justify="sb"
                  ph="sm"
                  light-gray
                  style={{ borderBottom: `1px solid ${colors["light-gray"]}` }}
                >
                  <Text sm pw="sm">
                    Total
                  </Text>
                  <Text sm pw="sm">
                    ${subtotalCartValue}
                  </Text>
                </Container>
              </Container>

              <Container
                w-100
                ph="sm"
                mh="xs"
                black
                style={{ cursor: "pointer" }}
                hover-shadow="1"
              >
                <Text sm pw="sm" white>
                  Siguiente
                </Text>
              </Container>

              <Container w-100>
                <Text
                  sm
                  ph="xs"
                  hover-color="dark-red"
                  style={{ cursor: "pointer" }}
                >
                  {"<"} Anterior
                </Text>
              </Container>
            </ResumeContainer>
          )}
        </CartContainer>
      </Container>
    </div>
  );
};

export default Cart;
