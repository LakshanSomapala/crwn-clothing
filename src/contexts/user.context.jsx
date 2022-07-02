import { createContext, useState, useEffect, useReducer } from "react";
import {
	onAuthStateChangedListner,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.util";

// as he actual value you want to access
export const UserContex = createContext({
	currentUser: null, // initial value when application start
	setCurrentUser: () => null, // empty function when begining
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state, // always spread all the other values of the state and only update what need to update (current user)
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandle type ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null); //using useState to state management
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // using reducer hook to state management
	const { currentUser } = state;

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }); // call reducer (userReducer) function withe the parameters
	};

	const value = { currentUser, setCurrentUser };

	// signOutUser()

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListner((user) => {
			if (user) createUserDocumentFromAuth(user); // if user comes create record
			setCurrentUser(user); // set user when user signs up or signs out. so we dont need to assign user anywhere in the code but here. this will give performance boost as well by needlessly running some functions in sign-in and sign-up components.
		});

		return unsubscribe;
	}, []); // only mount when only instantiate user context (only component mount). this will unmount using return value

	return <UserContex.Provider value={value}>{children}</UserContex.Provider>;
};
