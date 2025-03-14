import { useDispatch,useSelector } from 'react-redux';
import { FC } from 'react';
import {selectCartItems} from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {Name, Price, Footer, ProductCardContainer}from './product-card.styles'
import Button from '../button/button.component';
import { CategoryItem } from '../../store/categories/category.types';
type ProductCardProps = {
    product: CategoryItem;
  };
const ProductCard: FC<ProductCardProps> = ({product}) => {
    const {name, price, imageUrl} = product; 
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = ()=> dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name}/>
            <Footer>
                <Name>{name}</Name>
                <Price>${price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}
export default ProductCard;