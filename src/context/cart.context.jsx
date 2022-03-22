import { createContext, useState } from "react";

// helper function to check if product is in cart

const addCartItem = (cartItems, productToAdd) => {
    console.log(typeof(cartItems))
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setisCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},

});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setisCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //function to add Items to cart. setCatrtItems calls the function (defined above) addCartItem, which checks if it should add the product (if it is not already there)
  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const value = { isCartOpen, setisCartOpen, addItemToCart, cartItems  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
