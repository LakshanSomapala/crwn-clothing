// import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

import {
	selectCartItems,
	selectCartTotal,
} from "../../store/cart/cart-selector";
// import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import "./checkout.styles.scss";

const Checkout = () => {
	// const { cartItems, totalAmount } = useContext(CartContext);
	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectCartTotal);

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((cartItem) => {
				// const {name} = cartItem
				return (
					<CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
				);
			})}
			<span className="total">Total: AU$ {totalAmount}</span>
		</div>
	);
};

export default Checkout;
