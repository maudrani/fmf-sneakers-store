import React from "react";
import { Container } from "../../../../framework/assets";
import Panel from "../panel";
import SuscriptionsList from "./suscriptions-list";

const SuscriptionsPanel = ({ panels }) => {
  const verifyPanel = (panel) => {
    return panels === panel
      ? "flex"
      : panels === "suscriptions_all"
      ? "flex"
      : "none";
  };

  return (
    <Container w-100 direction="c" justify="fs" style={{ minWidth: "100%" }}>
      <Container
        w-100
        ph="xs"
        style={{
          display: verifyPanel("suscriptions_suscriptions"),
        }}
      >
        <Panel>
          <SuscriptionsList />
        </Panel>
      </Container>
    </Container>
  );
};

export default SuscriptionsPanel;
