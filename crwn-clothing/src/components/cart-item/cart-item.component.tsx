import {CartItemContainer, ItemDetails, Name}from "./cart-item.styles";
import {TCartItem} from "../../store/cart/cart.types";
import { FC, memo } from "react";
type CartItemsProps = {
  cartItem: TCartItem;
}
const CartItem: FC<CartItemsProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className="price ">{quantity} x {price}</span>
        </ItemDetails>
    </CartItemContainer>
 );
});
export default CartItem;
