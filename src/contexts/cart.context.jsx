import { createContext, useState, useEffect } from "react";

const addCartItems = (cartItems, productsToAdd) => {
	//find if cartItems contains productToAdd
	// const isFound = cartItems.find(cartItems.map(cartItem => { cartItem.id === productsToAdd.id }))
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productsToAdd.id
	);

	//if found increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productsToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	//return new array with modified cart items/new cart item
	return [...cartItems, { ...productsToAdd, quantity: 1 }]; //speadout all the exsisting items and spread out all the fields in productToAdd and set the quantity to 1 (as one object in the array)
};

const removeCartItems = (cartItems, cartItemToRemove) => {
	//find if cartItems contains cartItemToRemove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//if found check the quentity = 1, if yes remove the item from cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
	//decrease the quatity value by 1
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	}
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id != cartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemsToCart: () => {},
	remoceItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	totalAmount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false); //initialize the isCartOpen
	const [cartItems, setCartItems] = useState([]); //initialize cart item array
	const [cartCount, setCartCount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemsToCart = (productsToAdd) => {
		setCartItems(addCartItems(cartItems, productsToAdd));
	};

	const remoceItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItems(cartItems, cartItemToRemove));
	};

	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	useEffect(() => {
		const amount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setTotalAmount(amount);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemsToCart,
		remoceItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		totalAmount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
