import {RemoveButton, ImageContainer, CheckoutItemContainer} from './checkout-item.styles';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart.reducer';
const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {name, quantity, price, imageUrl} = cartItem;
    const removeItemHandler = ()=>dispatch(removeItemFromCart( cartItem));
    const addItemHandler = ()=>dispatch(addItemToCart( cartItem));
    const deleteItemHandler = ()=>dispatch(deleteItemFromCart( cartItem));

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
}
export default CheckoutItem;