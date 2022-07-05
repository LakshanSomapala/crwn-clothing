// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

// import { CartContext } from "../../contexts/cart.context";
import {
	addItemsToCart,
	remoceItemFromCart,
	clearItemFromCart,
} from "../../store/cart/cart-action";
import { selectCartItems } from "../../store/cart/cart-selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	// const { clearItemFromCart, addItemsToCart, remoceItemFromCart } =
	// 	useContext(CartContext);

	//Redux state managment
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));
	const addItemHandler = () => dispatch(addItemsToCart(cartItems, cartItem));
	const remoceItemHandler = () =>
		dispatch(remoceItemFromCart(cartItems, cartItem));

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`$name`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={remoceItemHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemHandler}>
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<span className="remove-button" onClick={clearItemHandler}>
				&#10005;
			</span>
		</div>
	);
};

export default CheckoutItem;
