import React from "react";
import { Container } from "../../../../framework/assets";
import Panel from "../panel";
import OrdersList from "./orders-list";

const OrdersPanel = ({ panels }) => {
  const verifyPanel = (panel) => {
    return panels === panel
      ? "flex"
      : panels === "orders_all"
      ? "flex"
      : "none";
  };

  return (
    <Container w-100 direction="c" justify="fs" style={{ minWidth: "100%" }}>
      <Container
        w-100
        ph="xs"
        style={{
          display: verifyPanel("orders_orders"),
        }}
      >
        <Panel>
          <OrdersList />
        </Panel>
      </Container>
    </Container>
  );
};

export default OrdersPanel;
