import {RemoveButton, ImageContainer, CheckoutItemContainer} from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const CheckoutItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;
    const {addItemToCart, deleteItemFromCart, removeItemFromCart} = useContext(CartContext);
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={()=> removeItemFromCart(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={()=>addItemToCart(cartItem)}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <RemoveButton onClick={()=>deleteItemFromCart(cartItem)}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;