import {RemoveButton, ImageContainer, CheckoutItemContainer} from './checkout-item.styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import {memo, FC} from'react';
import { TCartItem } from '../../store/cart/cart.types';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.action';
type CheckoutItemProps = {
    cartItem: TCartItem;
}
const CheckoutItem: FC<CheckoutItemProps> = memo(({cartItem}) => {
    const dispatch = useDispatch();
    const {name, quantity, price, imageUrl} = cartItem;
    const cartItems = useSelector(selectCartItems);
    const removeItemHandler = ()=>dispatch(removeItemFromCart(cartItems, cartItem));
    const addItemHandler = ()=>dispatch(addItemToCart(cartItems, cartItem));
    const deleteItemHandler = ()=>dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <RemoveButton onClick={deleteItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
})
export default CheckoutItem;