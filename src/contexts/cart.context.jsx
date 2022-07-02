import { createContext, useState, useEffect, useReducer } from "react";

// Helper function to insert, delete and clear item from cart
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

const CART_ACTION_TYPE = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITAIL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPE.SET_CART_ITEMS:
			return {
				...state,
				...payload, // spread payload as payload updated from appopriate values in Dispatch method. No need to assign values for cartItems, cartCount and totalAmount
			};
		case CART_ACTION_TYPE.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type of ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	//Using useState hook state managemnt
	// const [isCartOpen, setIsCartOpen] = useState(false); //initialize the isCartOpen
	// const [cartItems, setCartItems] = useState([]); //initialize cart item array
	// const [cartCount, setCartCount] = useState(0);
	// const [totalAmount, setTotalAmount] = useState(0);

	// useEffect(() => {
	// 	const newCartCount = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity,
	// 		0
	// 	);
	// 	setCartCount(newCartCount);
	// }, [cartItems]);

	// useEffect(() => {
	// 	const amount = cartItems.reduce(
	// 		(total, cartItem) => total + cartItem.quantity * cartItem.price,
	// 		0
	// 	);
	// 	setTotalAmount(amount);
	// }, [cartItems]);

	// Using useReducer hook state managment
	const [state, dispatch] = useReducer(cartReducer, INITAIL_STATE);
	const { isCartOpen, cartItems, cartCount, totalAmount } = state; // initialize variable in reducer

	const updateCartItemReducer = (newCartItems) => {
		//generate new cart count
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		//generate new care total
		const newCartAmount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		//dispatch newction with payload (newCartItems, cartCount, cartTotal)
		dispatch({
			type: CART_ACTION_TYPE.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartCount: newCartCount,
				totalAmount: newCartAmount,
			},
		});
	};

	const setIsCartOpen = (bool) => {
		dispatch({ type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: bool });
	};

	// Functions to add, remove and clear items from cart.
	const addItemsToCart = (productsToAdd) => {
		const newCartItems = addCartItems(cartItems, productsToAdd);
		updateCartItemReducer(newCartItems);
	};

	const remoceItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItems(cartItems, cartItemToRemove);
		updateCartItemReducer(newCartItems);
	};

	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemReducer(newCartItems);
	};

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
