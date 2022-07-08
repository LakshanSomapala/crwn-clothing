import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart-action";
import { CartItems, CART_ACTION_TYPE } from "./cart-action-type";

// const CART_INITAIL_STATE = {
// 	isCartOpen: false,
// 	cartItems: [],
// 	// cartCount: 0,
// 	// totalAmount: 0,
// };

// export const cartReducer = (state = CART_INITAIL_STATE, action = {}) => {
// 	const { type, payload } = action;

// 	switch (type) {
// 		case CART_ACTION_TYPE.SET_CART_ITEMS:
// 			return {
// 				...state,
// 				cartItems: payload, // spread payload as payload updated from appopriate values in Dispatch method. No need to assign values for cartItems, cartCount and totalAmount
// 			};
// 		case CART_ACTION_TYPE.SET_IS_CART_OPEN:
// 			return {
// 				...state,
// 				isCartOpen: payload,
// 			};
// 		default:
// 			return state;
// 	}
// };

//For TS
export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItems[];
};

const CART_INITAIL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
	// cartCount: 0,
	// totalAmount: 0,
};

// export const cartReducer = (state = CART_INITAIL_STATE, action = {}) => {
export const cartReducer = (
	state = CART_INITAIL_STATE,
	action: AnyAction
): CartState => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload,
		};
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload, // spread payload as payload updated from appopriate values in Dispatch method. No need to assign values for cartItems, cartCount and totalAmount
		};
	}

	return state;

	// const { type, payload } = action;

	// switch (type) {
	// 	case CART_ACTION_TYPE.SET_CART_ITEMS:
	// 		return {
	// 			...state,
	// 			cartItems: payload, // spread payload as payload updated from appopriate values in Dispatch method. No need to assign values for cartItems, cartCount and totalAmount
	// 		};
	// 	case CART_ACTION_TYPE.SET_IS_CART_OPEN:
	// 		return {
	// 			...state,
	// 			isCartOpen: payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
