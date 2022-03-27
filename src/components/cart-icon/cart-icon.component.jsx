import React from "react";
import {CartIconContainer, ShoppingIcon, ItemCount} from "./cart-icon.styles.js";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

function CartIcon() {
    const { isCartOpen, setisCartOpen, cartCount } = useContext(CartContext)
    const toggleCartOpen = () => setisCartOpen(!isCartOpen)
  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
