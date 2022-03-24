import { useContext }  from "react";
import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from '../../context/cart.context'
// import {Link} from 'react-router-dom' //isntead of link as a child of Button, we can use the hook useNavigate
import { useNavigate } from 'react-router-dom'


function CartDropdown() {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
      navigate('/checkout')
    }
    return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
          {cartItems.map(item =><CartItem id={item.id} cartItem={item}/>)} 
      </div>
      <Button onClick={goToCheckoutHandler }>GO TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown;
