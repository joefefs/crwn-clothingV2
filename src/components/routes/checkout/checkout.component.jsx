import React from "react";
import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../../context/cart.context";

function Checkout() {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

  console.log(cartItems);
  return (
    <>
      <div className="row">
        <h3>Product</h3>
        <h3>Description</h3>
        <h3>Quantity</h3>
        <h3>Price</h3>
        <h3>Remove</h3>
      </div>
      
        {cartItems.map((item) => {
          return (
            <div className="row" key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <p>{item.name}</p>
              <span>{item.quantity}</span>
              <br />
              <span onClick={()=> removeItemFromCart(item)}>DECREMENT</span>
              <span onClick={()=> addItemToCart(item)} >INCREMENT</span>
              <p>${item.price}</p>
              <h2>X</h2>
            </div>
          );
        })}
      
    </>
  );
}

export default Checkout;
