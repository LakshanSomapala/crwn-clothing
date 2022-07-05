import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Store, presistor } from "./store/store";
// import { UserProider } from './contexts/user.context';
// import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Provider store={Store}>
		<PersistGate loading={null} persistor={presistor}>
			<BrowserRouter>
				{/* <UserProider> user context for logged in user  */}
				{/* <CategoriesProvider> products context */}
				{/* <CartProvider> */}
				<App />
				{/* </CartProvider> */}
				{/* </CategoriesProvider> */}
				{/* </UserProider> */}
			</BrowserRouter>
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
