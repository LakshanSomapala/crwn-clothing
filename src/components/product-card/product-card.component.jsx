// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart-selector";
import { addItemsToCart } from "../../store/cart/cart-action";
// import { CartContext } from '../../contexts/cart.context';

import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ products }) => {
	const { name, price, imageUrl } = products;
	// const { addItemsToCart } = useContext(CartContext);
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const addProductToCart = () => {
		dispatch(addItemsToCart(cartItems, products));
	};

	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button buttonType="inverted" onClick={addProductToCart}>
				Add to card
			</Button>
		</div>
	);
};

export default ProductCard;
