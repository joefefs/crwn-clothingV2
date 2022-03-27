import React from "react";
import "./checkout-item.styles.js";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import {
  Arrow,
  CheckOutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
  BaseSpan,
} from "./checkout-item.styles";

function CheckoutItem({ cartItem }) {
  const { removeItemFromCart, addItemToCart, clearFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () => clearFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);
  return (
    <CheckOutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity} </Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckOutItemContainer>
  );
}

export default CheckoutItem;
