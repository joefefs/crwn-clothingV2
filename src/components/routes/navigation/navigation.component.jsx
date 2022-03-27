import { Fragment, useContext } from "react";
import { Outlet  } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
// import "./navigation.styles.scss"; Before Styled Components
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../../context/cart.context";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector((state)=> state.user.currentUser )
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        {/* Replaced original div with NavigationContainer component (has the styles)*/}
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          {/* For the Span that uses the NavLink class, you can use the 'as' prop to render it as a span instead of a Link, so it keeps the styles, but removes the Link component. */}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
