import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import Checkout from "../../routes/checkout/checkout.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate(); // instantiate navigate function to use
	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};
	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItem={item}></CartItem>
					))
				) : (
					<span className="empty-message">Your Cart is Empty</span>
				)}
			</div>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
