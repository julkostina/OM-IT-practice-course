import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'
import { useDispatch , useSelector} from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setCartIsOpen } from '../../store/cart/cart.action';
const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const toggleIsCartOpen = ()=> dispatch(setCartIsOpen(!isCartOpen));
    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer> 
    )
};
export default CartIcon;
