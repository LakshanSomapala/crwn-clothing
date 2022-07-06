import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart-selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
	//load stripe and elements
	const stripe = useStripe();
	const elements = useElements();

	const currentUser = useSelector((state) => state.user.currentUser);
	const amount = useSelector(selectCartTotal);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (event) => {
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

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.diplayName : "Guest",
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
