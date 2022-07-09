// // import { useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { selectCartItems } from "../../store/cart/cart-selector";
// import { addItemsToCart } from "../../store/cart/cart-action";
// // import { CartContext } from '../../contexts/cart.context';

// import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import "./product-card.styles.scss";
// import { CategoryItem } from "../../store/categories/category-action-types";
// import { FC } from "react";

// const ProductCard= ({ products }) => {
// 	const { name, price, imageUrl } = products;
// 	// const { addItemsToCart } = useContext(CartContext);
// 	const cartItems = useSelector(selectCartItems);
// 	const dispatch = useDispatch();

// 	const addProductToCart = () => {
// 		dispatch(addItemsToCart(cartItems, products));
// 	};

// 	return (
// 		<div className="product-card-container">
// 			<img src={imageUrl} alt={`${name}`} />
// 			<div className="footer">
// 				<span className="name">{name}</span>
// 				<span className="price">{price}</span>
// 			</div>
// 			<Button buttonType="inverted" onClick={addProductToCart}>
// 				Add to card
// 			</Button>
// 		</div>
// 	);
// };

// export default ProductCard;

//For TS
// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart-selector";
import { addItemsToCart } from "../../store/cart/cart-action";
// import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./product-card.styles.scss";
import { CategoryItem } from "../../store/categories/category-action-types";
import { FC } from "react";

type ProductCardProps = {
	products: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ products }) => {
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
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to card
			</Button>
		</div>
	);
};

export default ProductCard;
