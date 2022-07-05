import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
	onAuthStateChangedListner,
	createUserDocumentFromAuth,
	getCurrentUser,
} from "./utils/firebase/firebase.util";

import { setCurrentUser, checkUserSession } from "./store/user/user-action";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
	const dispatch = useDispatch(); // only one dispach method for entire application

	useEffect(() => {
		// const unsubscribe = onAuthStateChangedListner((user) => {
		// 	if (user) createUserDocumentFromAuth(user); // if user comes create record
		// 	dispatch(setCurrentUser(user)); //dispatch works as same exact way as userContex dispatch
		//   // set user when user signs up or signs out. so we dont need to assign user anywhere in the code but here. this will give performance boost as well by needlessly running some functions in sign-in and sign-up components.
		// });
		// return unsubscribe;

		//For Saga
		dispatch(checkUserSession());
		// getCurrentUser().then((user) => console.log(user));
	}, []); // only mount when only instantiate user context (only component mount). this will unmount using return value

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="shop/*" element={<Shop />} />
				{/* for nested routing, '*' is wildcard character which allows to nested routing for shop component. so 'shop/' is the parent for all the nested route inside the shop component. Here says, whatever the parameter value(*) for shop, render the <Shop/> component. (further routes can find inside the component) */}
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
