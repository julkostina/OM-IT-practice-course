import {CartIconContainer, ItemCount, ShoppingIcon}from'./cart-icon.styles'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CartIcon = () => {
const {isCartOpen, setIsCartOpen, itemsInCart} = useContext(CartContext);
const toggleCartIsOpen = () => setIsCartOpen(!isCartOpen);
    return(
        <CartIconContainer onClick={toggleCartIsOpen}>
            <ShoppingIcon/>
            <ItemCount>{itemsInCart}</ItemCount>
        </CartIconContainer> 
    )
};
export default CartIcon;
