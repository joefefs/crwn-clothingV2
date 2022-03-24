import React from "react";
import { ReactComponent as BagIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

function CartIcon() {
    const { isCartOpen, setisCartOpen, cartCount } = useContext(CartContext)
    const toggleCartOpen = () => setisCartOpen(!isCartOpen)
  return (
    <div onClick={toggleCartOpen} className="cart-icon-container">
      <BagIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}

export default CartIcon;
