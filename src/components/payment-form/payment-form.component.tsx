// import { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useSelector } from "react-redux";

// import { selectCartTotal } from "../../store/cart/cart-selector";

// import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import "./payment-form.styles.scss";

// const PaymentForm = () => {
// 	//load stripe and elements
// 	const stripe = useStripe();
// 	const elements = useElements();

// 	const currentUser = useSelector((state) => state.user.currentUser);
// 	const amount = useSelector(selectCartTotal);
// 	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

// 	const paymentHandler = async (event) => {
// 		event.preventDefault();
// 		if (!stripe || !elements) {
// 			return;
// 		}
// 		setIsProcessingPayment(true);

// 		const response = await fetch("/.netlify/functions/create-payment-intent", {
// 			method: "post",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ amount: amount * 100 }),
// 		}).then((res) => res.json());

// 		const {
// 			paymentIntent: { client_secret },
// 		} = response;

// 		const paymentResult = await stripe.confirmCardPayment(client_secret, {
// 			payment_method: {
// 				card: elements.getElement(CardElement),
// 				billing_details: {
// 					name: currentUser ? currentUser.diplayName : "Guest",
// 				},
// 			},
// 		});

// 		setIsProcessingPayment(false);

// 		if (paymentResult.error) {
// 			alert(paymentResult.error);
// 		} else {
// 			if (paymentResult.paymentIntent.status === "succeeded") {
// 				alert("Payment Successful");
// 			}
// 		}
// 	};

// 	return (
// 		<div className="paymentFormContainer">
// 			<form className="formContainer" onSubmit={paymentHandler}>
// 				<h2>Credite Card Payment: </h2>
// 				<CardElement></CardElement>
// 				<Button
// 					disabled={isProcessingPayment}
// 					buttonType={BUTTON_TYPE_CLASSES.inverted}
// 				>
// 					Pay Now
// 				</Button>
// 			</form>
// 		</div>
// 	);
// };

// export default PaymentForm;

//For TS
import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { StripeCardElement } from "@stripe/stripe-js";

import { selectCartTotal } from "../../store/cart/cart-selector";
import { selectCurrentUser } from "../../store/user/user-selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const ifValidCardElement = (
	card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
	//load stripe and elements
	const stripe = useStripe();
	const elements = useElements();

	const currentUser = useSelector(selectCurrentUser);
	const amount = useSelector(selectCartTotal);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsProcessingPayment(true);

		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());

		const {
			paymentIntent: { client_secret },
		} = response;

		const cardDetails = elements.getElement(CardElement);

		// if (cardDetails === null) return;
		if (!ifValidCardElement(cardDetails)) return; //type gaurd

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: cardDetails,
				billing_details: {
					name: currentUser ? currentUser.displayName : "Guest",
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				alert("Payment Successful");
			}
		}
	};

	return (
		<div className="paymentFormContainer">
			<form className="formContainer" onSubmit={paymentHandler}>
				<h2>Credite Card Payment: </h2>
				<CardElement></CardElement>
				<Button
					disabled={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay Now
				</Button>
			</form>
		</div>
	);
};

export default PaymentForm;
