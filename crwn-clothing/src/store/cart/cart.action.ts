import { CART_ACTION_TYPES,CartItem } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import {CategoryItem} from "../categories/category.types";
export const setCartIsOpen = (boolean: boolean) =>createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
const addCartItem = (cartItems:CartItem[], productToAdd:CartItem):CartItem[] => {
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
  const deleteCartItem = (cartItems:CartItem[], productToDelete:CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
  };
  const removeCartItem = (cartItems: CartItem[], productToRemove:CartItem):CartItem[] => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToRemove.id
    );
    if (existingCartItem && existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
export const setCartItems = withMatcher((cartItems:CartItem[]):SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
export const addItemToCart = (cartItems: CartItem[], productToAdd:CartItem) => {
    const newCartItems  = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
  };
 export  const removeItemFromCart = (cartItems:CartItem[],productToRemove:CartItem) => {
    const newCartItems  = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
  };
 export  const deleteItemFromCart = (cartItems:CartItem[],productToDelete:CartItem) => {
    const newCartItems  = deleteCartItem(cartItems, productToDelete);
    return setCartItems(newCartItems);
  };
  export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
  export const setIsCartOpen = withMatcher((boolean:boolean):SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
  })