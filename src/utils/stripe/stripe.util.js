import { loadStripe } from "@stripe/stripe-js";

//load stripe instance for the application
export const stripePromise = loadStripe(
	`S{process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
