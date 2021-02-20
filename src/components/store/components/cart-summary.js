import React from "react";
import { Container, Text } from "../../../framework/assets";
import Card from "../../basics/product-card-editable";
import { colors } from "../../../framework/global";
import { useHistory } from "react-router-dom";

const CartSummary = ({ cart }) => {
  const history = useHistory();

  return (
    <Container direction="c" w-100>
      <Container direction="c" w-100>
        {cart.length === 0 ? (
          <Container direction="c" mh="xl">
            <Text sm-size="xs" sm ph="sm">
              No hay productos en su carrito.
            </Text>
            <Container
              dark-yellow
              hover-bg="yellow"
              d-shadow="8"
              style={{ cursor: "pointer", padding: "10px 1rem" }}
              onClick={() => history.push("/store")}
            >
              <Text>Ir al Store</Text>
            </Container>
          </Container>
        ) : (
          cart.map((product, idx) => (
            <Container
              key={idx}
              white
              mh="xs"
              style={{
                borderTop: `2px solid ${colors["lightest-gray"]}`,
                minWidth: "98%",
              }}
            >
              <Card product={product} />
            </Container>
          ))
        )}
      </Container>
    </Container>
  );
};

export default CartSummary;
