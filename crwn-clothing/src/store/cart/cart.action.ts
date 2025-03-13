import { CART_ACTION_TYPES,TCartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
export const setCartIsOpen = (boolean: boolean) =>createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, TCartItem[]>;
const addCartItem = (cartItems:TCartItem[], productToAdd:CategoryItem):TCartItem[] => {
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
  const deleteCartItem = (cartItems:TCartItem[], productToDelete:TCartItem): TCartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
  };
  const removeCartItem = (cartItems: TCartItem[], productToRemove:TCartItem):TCartItem[] => {
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
export const setCartItems = withMatcher((cartItems:TCartItem[]):SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));
export const addItemToCart = (cartItems: TCartItem[], productToAdd:CategoryItem) => {
    const newCartItems  = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
  };
 export  const removeItemFromCart = (cartItems:TCartItem[],productToRemove:TCartItem) => {
    const newCartItems  = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
  };
 export  const deleteItemFromCart = (cartItems:TCartItem[],productToDelete:TCartItem) => {
    const newCartItems  = deleteCartItem(cartItems, productToDelete);
    return setCartItems(newCartItems);
  };
  export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
  export const setIsCartOpen = withMatcher((boolean:boolean):SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
  })