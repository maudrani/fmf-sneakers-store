import React, { useContext } from "react";
import { Container, Text } from "../../../framework/assets";
import { CartContext } from "../../context/cart-context";
import Card from "../../basics/product-card-small";
import styled from "styled-components";

const CardContainer = styled(Container)`
  @media (max-width: 768px) {
    * {
      /* font-size: 14px; */
    }
  }
`;

const CartSummary = () => {
  const [cart] = useContext(CartContext);

  return (
    <CardContainer direction="c" w-100>
      {cart.length === 0 ? (
        <Text mh="xl">No hay productos en su carrito.</Text>
      ) : (
        cart.map((product, idx) => <Card key={idx} product={product} />)
      )}
    </CardContainer>
  );
};

export default CartSummary;
