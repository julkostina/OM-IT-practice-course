import React, { useCallback, useMemo} from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import {CartDropdownContainer, EmptyMessage, CartItems}from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = useCallback(() => navigate('/checkout'),[]);
  return (
    <CartDropdownContainer>
      <CartItems>
        
        {cartItems.length?cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        )): <EmptyMessage>Your cart is empty</EmptyMessage>}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
