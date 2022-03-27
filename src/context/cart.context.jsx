import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// helper function to check if product is in cart

const addCartItem = (cartItems, productToAdd) => {
  // if product to Add ID is the same as a cart item ID, increment quantity
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
  // otherwise, spread the product to add into the new array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//helper to remove
const removeCartItem = (cartItems, cartItemToRemove) => {
  //fin cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if Q = 1 if yes, remove completely

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id); // return bol, if IDs match, returns true and keeps the value, if not, it filters the arr
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  //if it isn't, return cartItems with matching cart item with reduced Q
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setisCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  // OLD USE STATE CODE!
  //   const [isCartOpen, setisCartOpen] = useState(false);
  //   const [cartItems, setCartItems] = useState([]);
  //   const [cartCount, setCartCount] = useState(0);
  //   const [cartTotal, setCartTotal] = useState(0);

  //   useEffect(() => {
  //     const newCartCount = cartItems.reduce(
  //       (total, cartItem) => total + cartItem.quantity,
  //       0
  //     );
  //     setCartCount(newCartCount);
  //   }, [cartItems]);

  //   useEffect(()=>{
  //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
  //     setCartTotal(newCartTotal)
  //   },[cartItems])

  //new function to dispatch payload using cartReducer
  const updateCartItemsReducer = (newCartItems) => {

    const newCartCount =  newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    ); //used to live in a useEffect
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    ); //used to live in a useEffect

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };
  //function to add Items to cart. setCatrtItems calls the function (defined above) addCartItem, which checks if it should add the product (if it is not already there)
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product); //changed setCartItems to a variable (not using useState anymore!)
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (carItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, carItemToRemove); //changed setCartItems to a variable (not using useState anymore!)
    updateCartItemsReducer(newCartItems);
  };
  const clearFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear); //changed setCartItems to a variable (not using useState anymore!)
    updateCartItemsReducer(newCartItems);
  };
  //new method for setting isCartOpen without useState:
  const setisCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setisCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
