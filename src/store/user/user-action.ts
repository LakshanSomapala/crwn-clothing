import { USER_ACTION_TYPES } from "./user-action-types";
import {
	withMatcher,
	Action,
	ActionWithPaylod,
} from "../../utils/reducer/reducer.util";
import {
	UserData,
	AdditionalInformation,
} from "../../utils/firebase/firebase.util";
import { User } from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPaylod<
	USER_ACTION_TYPES.SET_CURRENT_USER,
	UserData
>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPaylod<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;

export type SignInSuccess = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_IN_SUCCESS,
	UserData
>;

export type SignInFailed = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_IN_FAILED,
	Error
>;

export type SignUpStart = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_UP_START,
	{ email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{ user: User; additionalDetails: AdditionalInformation }
>;

export type SignUpFailed = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_UP_FAILED,
	Error
>;

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPaylod<
	USER_ACTION_TYPES.SIGN_OUT_FAILED,
	Error
>;

export const checkUserSession = withMatcher((): CheckUserSession => {
	return { type: USER_ACTION_TYPES.CHECK_USER_SESSION };
});

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }; // call reducer (userReducer)
	//function withe the parameters
});

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
	return { type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START };
});

export const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart => {
		return {
			type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
			payload: { email, password },
		};
	}
);

export const signInSuccess = withMatcher(
	(user: UserData & { id: string }): SignInSuccess => {
		return { type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user };
	}
);

export const signInFailed = withMatcher((error: Error): SignInFailed => {
	return { type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error };
});

export const signUpStart = withMatcher(
	(email: string, password: string, displayName: string): SignUpStart => {
		return {
			type: USER_ACTION_TYPES.SIGN_UP_START,
			payload: { email, password, displayName },
		};
	}
);

export const signUpSuccess = withMatcher(
	(user: User, additionalDetails: AdditionalInformation): SignUpSuccess => {
		return {
			type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
			payload: { user, additionalDetails },
		};
	}
);

export const signupFailed = withMatcher((error: Error): SignUpFailed => {
	return { type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: error };
});

export const signOutStart = withMatcher((): SignOutStart => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_START };
});

export const signOutSuccess = withMatcher((): SignOutSuccess => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS };
});

export const signOutFailed = withMatcher((error: Error): SignOutFailed => {
	return { type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error };
});
