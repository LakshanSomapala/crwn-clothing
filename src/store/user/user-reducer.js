import { USER_ACTION_TYPES } from "./user-action-types";

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
	// if nothing get pass for state value use initial state values
	const { type, payload } = action;

	switch (type) {
		//For Thunk
		// case USER_ACTION_TYPES.SET_CURRENT_USER:
		// 	return {
		// 		...state, // always spread all the other values of the state and only update what need to update (current user)
		// 		currentUser: payload,
		// 	};
		// default:
		// 	return state;

		//For Saga
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state, // always spread all the other values of the state and only update what need to update (current user)
				currentUser: payload,
			};
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
			};
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
			return {
				...state, // always spread all the other values of the state and only update what need to update (current user)
				error: payload,
			};
		default:
			return state;
	}
};
