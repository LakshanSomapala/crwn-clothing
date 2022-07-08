// import { takeLatest, all, call, put } from "redux-saga/effects";

// import { USER_ACTION_TYPES } from "./user-action-types";

// import {
// 	signInFailure,
// 	signInSuccess,
// 	signOutFailed,
// 	signOutSuccess,
// 	signupFailure,
// 	signUpSuccess,
// } from "./user-action";

// import {
// 	getCurrentUser,
// 	createUserDocumentFromAuth,
// 	SignInWithGooglePopup,
// 	signInAuthUserWithEmailAndPassword,
// 	createAuthUserWithEmailAndPassword,
// 	signOutUser,
// } from "../../utils/firebase/firebase.util";

// export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
// 	try {
// 		const userSnapshot = yield call(
// 			createUserDocumentFromAuth,
// 			userAuth,
// 			additionalInformation
// 		);
// 		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
// 	} catch (error) {
// 		yield put(signInFailure(error));
// 		console.log("error");
// 	}
// }

// export function* signInWithGoogle() {
// 	try {
// 		const { user } = yield call(SignInWithGooglePopup);
// 		yield call(getSnapshotFromUserAuth, user);
// 	} catch (error) {
// 		yield put(signInFailure(error));
// 	}
// }

// export function* signInWithEmail({ payload: { email, password } }) {
// 	try {
// 		const { user } = yield call(
// 			signInAuthUserWithEmailAndPassword,
// 			email,
// 			password
// 		);
// 		yield call(getSnapshotFromUserAuth, user);
// 	} catch (error) {
// 		yield put(signInFailure(error));
// 	}
// }

// export function* isUserAuthenticated() {
// 	try {
// 		const userAuth = yield call(getCurrentUser);
// 		if (!userAuth) return;
// 		console.log(userAuth);
// 		yield call(getSnapshotFromUserAuth, userAuth);
// 	} catch (error) {
// 		yield put(signInFailure(error));
// 	}
// }

// export function* signUp({ payload: { email, password, displayName } }) {
// 	try {
// 		const { user } = yield call(
// 			createAuthUserWithEmailAndPassword,
// 			email,
// 			password
// 		);
// 		yield put(signUpSuccess(user, { displayName }));
// 	} catch (error) {
// 		yield put(signupFailure(error));
// 	}
// }

// export function* signInAfterSignUp({
// 	payload: { user, additionalInformation },
// }) {
// 	yield call(getSnapshotFromUserAuth, user, additionalInformation);
// }

// export function* signOut() {
// 	try {
// 		yield call(signOutUser);
// 		yield put(signOutSuccess());
// 	} catch (error) {
// 		yield put(signOutFailed(error));
// 	}
// }

// //Entry point for action types
// export function* onGoogleSignInStart() {
// 	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
// }
// export function* onEmailSignInStart() {
// 	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
// }

// export function* onCheckUserSession() {
// 	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
// }

// export function* onSignUpStart() {
// 	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
// }

// export function* onSignUpSuccess() {
// 	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

// export function* onSignOutStart() {
// 	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
// }

// export function* userSaga() {
// 	yield all([
// 		call(onCheckUserSession),
// 		call(onGoogleSignInStart),
// 		call(onEmailSignInStart),
// 		call(onSignUpStart),
// 		call(onSignUpSuccess),
// 		call(onSignOutStart),
// 	]);
// }

// for TS
import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { User } from "firebase/auth";

import { USER_ACTION_TYPES } from "./user-action-types";

import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signupFailed,
	signUpSuccess,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from "./user-action";

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	SignInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
	AdditionalInformation,
} from "../../utils/firebase/firebase.util";

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalInformation?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalInformation
		);

		if (userSnapshot) {
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
		console.log("error");
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(SignInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInWithEmail({
	payload: { email, password },
}: EmailSignInStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		console.log(userAuth);
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);

		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signupFailed(error as Error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalDetails },
}: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

//Entry point for action types
export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
