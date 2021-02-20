import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Container, Text } from "../../../framework/assets";
import { colors } from "../../../framework/global";
import { CartContext } from "../../context/cart-context";

const QuantityGlobe = styled(Container)`
  @media (max-height: 768px) {
    width: 1rem;
    height: 1rem;
  }
`;

const BascketIcon = ({
  color = "white",
  hideData = false,
  size,
  hoverColor,
}) => {
  const [iconColor, setIconColor] = useState(color);

  const [cart] = useContext(CartContext);

  const lengthToShow = () => (cart.length > 9 ? "+9" : cart.length);

  const containerConfig = {};
  containerConfig[`w-${size}`] = true;

  const hideInfo = () => {
    let result = cart.length === 0 ? false : true;

    result = hideData ? false : result;

    return result;
  };

  return (
    <Container>
      
        {hideInfo() && (
          <QuantityGlobe
            yellow
            b-radius="circular"
            style={{
              position: "absolute",
              top: "-25%",
              right: "-50%",
              cursor: "default",
              width: "1rem",
              height: "1rem",
              backgroundColor: colors[hoverColor],
              zIndex: '10',
            }}
          >
            <Text weight="black" style={{ fontSize: "0.6rem" }}>
              {lengthToShow()}
            </Text>
          </QuantityGlobe>
        )}
        <svg
          onMouseEnter={() => setIconColor(hoverColor)}
          onMouseLeave={() => setIconColor(color)}
          viewBox="0 -31 512.00026 512"
          style={{
            width: size + "rem",
            minWidth: "1.3rem",
            fill: colors[iconColor],
          }}
        >
          <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0" />
          <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
          <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
        </svg>
      
    </Container>
  );
};

export default BascketIcon;
