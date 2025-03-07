import { createContext,useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
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
const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};
const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  itemsInCart: 0,
  deleteItemFromCart: () => {},
  cartTotal:0,
});
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemsInCart: 0,
  cartTotal:0
};

const CART_ACTION_TYPES = {
  'SET_CART_ITEMS' : 'SET_CART_ITEMS',
  'SET_IS_CART_OPEN' : 'SET_IS_CART_OPEN'
}
const cartReducer = (state, action)=>{
  const {type, payload} = action;
  
  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen: payload}
    default:
      throw new Error(`Unhandled action type: ${type} in cartReducer`);
  }
}


export const CartProvider = ({ children }) => {
  const [{cartItems, isCartOpen, itemsInCart, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const updateCartItemsReducer = (newCartItems)=>{
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, itemsInCart: newCartCount}));
  }
  const addItemToCart = (productToAdd) => {
    const newCartItems  = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems  = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const deleteItemFromCart = (productToDelete) => {
    const newCartItems  = deleteCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
  };
 
  const setIsCartOpen = (bool)=>{
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,  bool));
  }
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    itemsInCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
