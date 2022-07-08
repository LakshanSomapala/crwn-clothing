// import { useState, useContext } from "react";
// import { useDispatch } from "react-redux";

// import {
// 	googleSignInStart,
// 	emailSignInStart,
// } from "../../store/user/user-action";
// import {
// 	SignInWithGooglePopup,
// 	// createUserDocumentFromAuth,
// 	signInAuthUserWithEmailAndPassword,
// } from "../../utils/firebase/firebase.util";
// // import { UserContex } from "../../contexts/user.context";
// import FormInputs from "../form-input/form-input.component";
// import Button from "../button/button.component";
// import "./sign-in-form.styles.scss";

// const defaultFormField = {
// 	email: "",
// 	password: "",
// };

// const SignInForm = () => {
// 	const dispatch = useDispatch();
// 	const [formFields, setFormFields] = useState(defaultFormField);
// 	const { email, password } = formFields;

// 	const signInWithGoogle = async () => {
// 		// await SignInWithGooglePopup();

// 		//For Saga
// 		dispatch(googleSignInStart());
// 	};

// 	const refreshFormField = () => {
// 		setFormFields(defaultFormField);
// 	};

// 	const handleSubmit = async (event) => {
// 		event.preventDefault();

// 		try {
// 			// await signInAuthUserWithEmailAndPassword(email, password);

// 			//For Saga
// 			dispatch(emailSignInStart(email, password));
// 			refreshFormField();
// 		} catch (error) {
// 			switch (error.code) {
// 				case "auth/wrong-password":
// 					alert("Incorrect password for email");
// 					break;
// 				case "auth/user-not-found":
// 					alert("No user associated with  email");
// 					break;
// 				default:
// 					console.log(error);
// 			}
// 		}
// 	};

// 	const handleChange = (event) => {
// 		const { name, value } = event.target; // name and value of the FormInputs fields will come thrpough the event object when fired.

// 		// setFormFields({[name]: value}); // update appropriate form field when user type in, but set other formfields to undifie. correct way is below

// 		setFormFields({ ...formFields, [name]: value }); //update appropriate form field when user type in, but other fields does not change. remain their previous value
// 	};

// 	return (
// 		<div className="sign-up-container">
// 			<h2>Already hava an account?</h2>
// 			<span>Sign in with your email and password</span>
// 			<form onSubmit={handleSubmit}>
// 				<FormInputs
// 					label="Email"
// 					type="email"
// 					required
// 					onChange={handleChange}
// 					name="email"
// 					value={email}
// 				/>

// 				<FormInputs
// 					label="Password"
// 					type="password"
// 					required
// 					onChange={handleChange}
// 					name="password"
// 					value={password}
// 				/>

// 				<div className="buttons-container">
// 					<Button type="submit">Sign In</Button>
// 					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
// 						Sign In
// 					</Button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default SignInForm;

import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import {
	googleSignInStart,
	emailSignInStart,
} from "../../store/user/user-action";
import {
	SignInWithGooglePopup,
	// createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
// import { UserContex } from "../../contexts/user.context";
import FormInputs from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormField = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormField);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		// await SignInWithGooglePopup();

		//For Saga
		dispatch(googleSignInStart());
	};

	const refreshFormField = () => {
		setFormFields(defaultFormField);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			// await signInAuthUserWithEmailAndPassword(email, password);

			//For Saga
			dispatch(emailSignInStart(email, password));
			refreshFormField();
		} catch (error) {
			console.log("user sign in failed", error as Error);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target; // name and value of the FormInputs fields will come thrpough the event object when fired.

		// setFormFields({[name]: value}); // update appropriate form field when user type in, but set other formfields to undifie. correct way is below

		setFormFields({ ...formFields, [name]: value }); //update appropriate form field when user type in, but other fields does not change. remain their previous value
	};

	return (
		<div className="sign-up-container">
			<h2>Already hava an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInputs
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInputs
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>

				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
