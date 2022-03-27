import { useContext } from "react";
import {CartDropDopwnContainer, EmptyMessage, CartItemsContainer} from "./cart-dropdown.styles.js";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../context/cart.context";
// import {Link} from 'react-router-dom' //isntead of link as a child of Button, we can use the hook useNavigate
import { useNavigate } from "react-router-dom";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDropDopwnContainer>
      <CartItemsContainer>
        {
          cartItems.length ? cartItems.map((item)=> (
            <CartItem id={item.id} cartItem={item} />
          )) : <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      
      </CartItemsContainer>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDopwnContainer>
  );
}

export default CartDropdown;
