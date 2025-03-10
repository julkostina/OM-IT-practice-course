import { createSlice } from '@reduxjs/toolkit';

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


const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [], 
  };

export const cartSlice = createSlice({
  name:"cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItemToCart(state, action){
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action){
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    deleteItemFromCart(state, action){
      state.cartItems = deleteCartItem(state.cartItems, action.payload);
    },
    setIsCartOpen(state, action){
      state.isCartOpen = action.payload;
    }
  }
})
export const { addItemToCart, removeItemFromCart, deleteItemFromCart, setIsCartOpen } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;