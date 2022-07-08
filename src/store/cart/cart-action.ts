import { CategoryItem } from "../categories/category-action-types";
import { CART_ACTION_TYPE, CartItems } from "./cart-action-type";
import {
	withMatcher,
	Action,
	ActionWithPaylod,
	createAction,
} from "../../utils/reducer/reducer.util";

// // Helper function to insert, delete and clear item from cart
// const addCartItems = (cartItems,productsToAdd) => {
// 	//find if cartItems contains productToAdd
// 	// const isFound = cartItems.find(cartItems.map(cartItem => { cartItem.id === productsToAdd.id }))
// 	const existingCartItem = cartItems.find(
// 		(cartItem) => cartItem.id === productsToAdd.id
// 	);

// 	//if found increment quantity
// 	if (existingCartItem) {
// 		return cartItems.map((cartItem) =>
// 			cartItem.id === productsToAdd.id
// 				? { ...cartItem, quantity: cartItem.quantity + 1 }
// 				: cartItem
// 		);
// 	}

// 	//return new array with modified cart items/new cart item
// 	return [...cartItems, { ...productsToAdd, quantity: 1 }]; //speadout all the exsisting items and spread out all the fields in productToAdd and set the quantity to 1 (as one object in the array)
// };

// const removeCartItems = (cartItems,	cartItemToRemove) => {
// 	//find if cartItems contains cartItemToRemove
// 	const existingCartItem = cartItems.find(
// 		(cartItem) => cartItem.id === cartItemToRemove.id
// 	);

// 	//if found check the quentity = 1, if yes remove the item from cart
// 	if (existingCartItem && existingCartItem.quantity === 1) {
// 		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
// 	}

// 	//decrease the quatity value by 1
// 	return cartItems.map((cartItem) =>
// 		cartItem.id === cartItemToRemove.id
// 			? { ...cartItem, quantity: cartItem.quantity - 1 }
// 			: cartItem
// 	);
// };

// const clearCartItem = (cartItems,cartItemToClear) => {
// 	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
// };

// export const setIsCartOpen = (bool) => {
// 	return { type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: bool };
// };

// // Functions to add, remove and clear items from cart.
// export const addItemsToCart = (cartItems, productsToAdd) => {
// 	const newCartItems = addCartItems(cartItems, productsToAdd);
// 	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
// };

// export const remoceItemFromCart = (cartItems, cartItemToRemove) => {
// 	const newCartItems = removeCartItems(cartItems, cartItemToRemove);
// 	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
// };

// export const clearItemFromCart = (cartItems, cartItemToClear) => {
// 	const newCartItems = clearCartItem(cartItems, cartItemToClear);
// 	return { type: CART_ACTION_TYPE.SET_CART_ITEMS, payload: newCartItems };
// };

//For TS
// Helper function to insert, delete and clear item from cart
const addCartItems = (
	cartItems: CartItems[],
	productsToAdd: CategoryItem
): CartItems[] => {
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

const removeCartItems = (
	cartItems: CartItems[],
	cartItemToRemove: CartItems
): CartItems[] => {
	//find if cartItems contains cartItemToRemove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//if found check the quentity = 1, if yes remove the item from cart
	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	//decrease the quatity value by 1
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (
	cartItems: CartItems[],
	cartItemToClear: CartItems
): CartItems[] => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPaylod<
	CART_ACTION_TYPE.SET_IS_CART_OPEN,
	boolean
>;

export type SetCartItems = ActionWithPaylod<
	CART_ACTION_TYPE.SET_CART_ITEMS,
	CartItems[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
	return { type: CART_ACTION_TYPE.SET_IS_CART_OPEN, payload: boolean };
});

export const setCartItems = withMatcher(
	(cartItems: CartItems[]): SetCartItems =>
		createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
);

// Functions to add, remove and clear items from cart.
export const addItemsToCart = (
	cartItems: CartItems[],
	productsToAdd: CategoryItem
) => {
	const newCartItems = addCartItems(cartItems, productsToAdd);
	return setCartItems(newCartItems);
};

export const remoceItemFromCart = (
	cartItems: CartItems[],
	cartItemToRemove: CartItems
) => {
	const newCartItems = removeCartItems(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (
	cartItems: CartItems[],
	cartItemToClear: CartItems
) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
