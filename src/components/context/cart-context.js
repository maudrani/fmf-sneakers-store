import React, { createContext } from "react";
import {UseLocalStorage} from '../../helpers/customHooks'

const CartProvider = (props) => {
  const [cart, setCart] = UseLocalStorage('cart', '');

  return <CartContext.Provider value={[cart, setCart]}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
export const CartContext = createContext();