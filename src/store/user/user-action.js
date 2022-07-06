import { USER_ACTION_TYPES } from "./user-action-types";

export const setCurrentUser = (user) => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }; // call reducer (userReducer) function withe the parameters
};

/**
 * 
 * 	CHECK_USER_SESSION: "CHECK_USER_SESSION",
	GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
	EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
	SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
	SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
 * 
 * 
 */

export const checkUserSession = () => {
	return { type: USER_ACTION_TYPES.CHECK_USER_SESSION };
};
export const googleSignInStart = () => {
	return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START };
};
export const emailSignInStart = (email, password) => {
	return {
		type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
		payload: { email, password },
	};
};
export const signInSuccess = (user) => {
	return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user };
};
export const signInFailure = (error) => {
	return { type: USER_ACTION_TYPES.SIGN_IN_FAILED, error };
};

export const signUpStart = (email, password, displayName) => {
	return {
		type: USER_ACTION_TYPES.SIGN_UP_START,
		payload: { email, password, displayName },
	};
};

export const signUpSuccess = (user, additionalDetails) => {
	return {
		type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
		payload: { user, additionalDetails },
	};
};

export const signupFailure = (error) => {
	return { type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: error };
};

export const signOutStart = () => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_START };
};
export const signOutSuccess = () => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS };
};
export const signOutFailed = (error) => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error };
};
