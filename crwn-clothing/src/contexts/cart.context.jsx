import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd)=>{
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
     }
    return [...cartItems, {...productToAdd, quantity: 1}];
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen:()=>{},
    cartItems: [],
    addItemToCart:()=>{},
    itemsInCart: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const itemsInCart = cartItems.reduce((acc, cartItem)=> acc + cartItem.quantity, 0);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, itemsInCart};

    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}