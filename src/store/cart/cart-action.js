import { CART_ACTION_TYPE } from "./cart-action-type";

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
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const setIsCartOpen = (bool) => {
	return { type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: bool };
};

// Functions to add, remove and clear items from cart.
export const addItemsToCart = (cartItems, productsToAdd) => {
	const newCartItems = addCartItems(cartItems, productsToAdd);
	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
};

export const remoceItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItems(cartItems, cartItemToRemove);
	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
};
