import React from "react";
import { Container } from "../../../framework/assets";

const Panel = ({ children }) => {
  return (
    <Container w-100 white pw="xs" ph="xs" d-shadow="8" b-radius='xs'>
      {children}
    </Container>
  );
};

export default Panel;
