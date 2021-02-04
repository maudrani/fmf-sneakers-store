import React, { useState, createContext } from "react";

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  return <CartContext.Provider value={[cart, setCart]}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
export const CartContext = createContext();