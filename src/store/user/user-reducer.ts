import { AnyAction } from "redux";
import { USER_ACTION_TYPES } from "./user-action-types";
import {
	signInFailed,
	signOutFailed,
	signupFailed,
	signInSuccess,
	signOutSuccess,
} from "./user-action";
import { UserData } from "../../utils/firebase/firebase.util";

// const INITIAL_STATE = {
// 	currentUser: null,
// 	isLoading: false,
// 	error: null,
// };

// export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
// 	// if nothing get pass for state value use initial state values
// 	const { type, payload } = action;

// 	switch (type) {
// 		//For Thunk
// 		// case USER_ACTION_TYPES.SET_CURRENT_USER:
// 		// 	return {
// 		// 		...state, // always spread all the other values of the state and only update what need to update (current user)
// 		// 		currentUser: payload,
// 		// 	};
// 		// default:
// 		// 	return state;

// 		//For Saga
// 		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
// 			return {
// 				...state, // always spread all the other values of the state and only update what need to update (current user)
// 				currentUser: payload,
// 			};
// 		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
// 			return {
// 				...state,
// 				currentUser: null,
// 			};
// 		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
// 		case USER_ACTION_TYPES.SIGN_IN_FAILED:
// 		case USER_ACTION_TYPES.SIGN_UP_FAILED:
// 			return {
// 				...state, // always spread all the other values of the state and only update what need to update (current user)
// 				error: payload,
// 			};
// 		default:
// 			return state;
// 	}
// };

//For TS
export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	// if nothing get pass for state value use initial state values
	// const { type, payload } = action;

	if (signInSuccess.match(action)) {
		return {
			...state, // always spread all the other values of the state and only update what need to update (current user)
			currentUser: action.payload,
		};
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
		};
	}

	if (
		signOutFailed.match(action) ||
		signInFailed.match(action) ||
		signupFailed.match(action)
	) {
		return {
			...state, // always spread all the other values of the state and only update what need to update (current user)
			error: action.payload,
		};
	}

	return state;

	// switch (type) {
	// 	//For Thunk
	// 	// case USER_ACTION_TYPES.SET_CURRENT_USER:
	// 	// 	return {
	// 	// 		...state, // always spread all the other values of the state and only update what need to update (current user)
	// 	// 		currentUser: payload,
	// 	// 	};
	// 	// default:
	// 	// 	return state;

	// 	//For Saga
	// 	case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
	// 		return {
	// 			...state, // always spread all the other values of the state and only update what need to update (current user)
	// 			currentUser: payload,
	// 		};
	// 	case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
	// 		return {
	// 			...state,
	// 			currentUser: null,
	// 		};
	// 	case USER_ACTION_TYPES.SIGN_OUT_FAILED:
	// 	case USER_ACTION_TYPES.SIGN_IN_FAILED:
	// 	case USER_ACTION_TYPES.SIGN_UP_FAILED:
	// 		return {
	// 			...state, // always spread all the other values of the state and only update what need to update (current user)
	// 			error: payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
