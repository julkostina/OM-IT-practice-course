import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CartIcon = () => {
const {isCartOpen, setIsCartOpen, itemsInCart} = useContext(CartContext);
const toggleCartIsOpen = () => setIsCartOpen(!isCartOpen);
    return(
        <div className="cart-icon-container" onClick={toggleCartIsOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{itemsInCart}</span>
        </div> 
    )
};
export default CartIcon;
