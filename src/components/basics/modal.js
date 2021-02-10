import React, { useRef } from "react";
import useOutsideClick from "../../helpers/outsideClick";
import { Container } from "../../framework/assets";
import styled from "styled-components";

const Background = styled(Container)`
  z-index: 110;
  position: fixed;
  background-color: rgba(190, 190, 190, 0.9);
  min-height: 100vh;
  min-width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const ProductModal = ({ launched, setLaunched, children }) => {
  const modal = useRef();

  useOutsideClick(modal, () => {
    if (launched) {
      setLaunched(false);
    }
  });

  return (
    <Background
      w-100
      h-100
      ph="md"
      align="fs"
      style={{
        display: launched ? "flex" : "none",
        opacity: launched ? "1" : "0",
        top: "0",
      }}
    >
      <div ref={modal}>{children}</div>
    </Background>
  );
};

export default ProductModal;
