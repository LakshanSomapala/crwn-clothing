import { createContext, useState, useEffect } from "react";

const addCartItems = (cartItems, productsToAdd) => {
    //find if cartItems contains productToAdd
    // const isFound = cartItems.find(cartItems.map(cartItem => { cartItem.id === productsToAdd.id }))
    const existingCartItem = cartItems.find((cartItem) => (cartItem.id === productsToAdd.id))

    //if found increment quantity 
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productsToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }

    //return new array with modified cart items/new cart item
    return [...cartItems, { ...productsToAdd, quantity: 1 }]; //speadout all the exsisting items and spread out all the fields in productToAdd and set the quantity to 1 (as one object in the array)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { },
    cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false); //initialize the isCartOpen
    const [cartItems, setCartItems] = useState([]); //initialize cart item array
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemsToCart = (productsToAdd) => {
        setCartItems(addCartItems(cartItems, productsToAdd))
    }

    const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}