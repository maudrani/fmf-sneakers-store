import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Text } from "../../../framework/assets";
import { colors, sizes } from "../../../framework/global";

const ResumeContainer = styled(Container)`
  @media (max-width: 1258px) {
    * {
      font-size: 20px;
    }
  }

  @media (max-width: 990px) {
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

const OrderTotals = ({ cart, order }) => {
  const [subtotalCartValue, setSubTotal] = useState(0);
  const [total, setTotal] = useState(subtotalCartValue);

  useEffect(() => {
    let value = 0;
    cart.map((product) => (value += product.total));
    setSubTotal(value);
  }, [cart]);

  useEffect(() => {
    if (order.payment_method === "mercadopago") {
      setTotal(subtotalCartValue + subtotalCartValue * 0.1);
    } else {
      setTotal(subtotalCartValue);
    }
  }, [order, subtotalCartValue]);

  return (
    <ResumeContainer id="cartresume" w-100 h-100 direction="c" justify="fs">
      <Container w-100 direction="c" b-shadow="2">
        <Container
          w-100
          justify="fs"
          style={{ borderBottom: `1px solid ${colors["light-gray"]}` }}
          lightest-gray
        >
          <Text sm pw="sm" ph="sm">
            Totales
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
          {order.payment_method  ? (
            <Container w-100 justify="sb" ph="xs">
              <Text weight="light" style={{ fontSize: "18px" }}>
                {order.payment_method === "mercadopago"
                  ? "Mercado Pago - recargo"
                  : "..."}
              </Text>
              <Text weight="light" style={{ fontSize: "22px" }}>
                $
                {order.payment_method === "mercadopago"
                  ? subtotalCartValue * 0.1
                  : "-"}
              </Text>
            </Container>
          ) : (
            <Container w-100 justify="sb" ph="xs">
              <Text weight="light" style={{ fontSize: "18px" }}>
                {"..."}
              </Text>
              <Text weight="light" style={{ fontSize: "22px" }}>
                ${"-"}
              </Text>
            </Container>
          )}

          <Container w-100 justify="sb" ph="xs">
            <Text weight="light" style={{ fontSize: "18px" }}>
              {order.payment_method && "Envío"}
            </Text>
            <Text weight="light" style={{ fontSize: "22px" }}>
              {order.payment_method && "$800"}
            </Text>
          </Container>
        </Container>

        <Container w-100 justify="sb" ph="sm" light-gray>
          <Text sm pw="sm">
            Total
          </Text>
          <Text sm pw="sm">
            ${total}
          </Text>
        </Container>
      </Container>
    </ResumeContainer>
  );
};

export default OrderTotals;
