import React from "react";
import {CheckoutContainer, CheckoutHeader, Header, Total} from "./checkout.styles.js";
import { useContext } from "react";
import { CartContext } from "../../../context/cart.context";
import CheckoutItem from "../../checkout-item/checkout-item.component";

function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <Header>
          <span>Product</span>
        </Header>
        <Header>
          <span>Description</span>
        </Header>
        <Header>
          <span>Quantity</span>
        </Header>
        <Header>
          <span>Price</span>
        </Header>
        <Header>
          <span>Remove</span>
        </Header>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem cartItem={cartItem} />
      ))}

      <Total>TOTAL ${cartTotal}</Total>
    </CheckoutContainer>
  );
}

export default Checkout;
