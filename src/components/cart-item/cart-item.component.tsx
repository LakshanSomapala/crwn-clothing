// import "./cart-item.styles.scss";

// const CartItem= ({ cartItem }) => {
// 	const { name, quantity, price, imageUrl } = cartItem;
// 	return (
// 		<div className="cart-item-container">
// 			<img src={imageUrl} alt={`${name}`} />
// 			<div className="item-details">
// 				<span className="name">{name}</span>
// 				<span className="price">
// 					{quantity} * $ {price}
// 				</span>
// 			</div>
// 		</div>
// 	);
// };

// export default CartItem;

//For TS
import { FC, memo } from "react";

import { CartItems } from "../../store/cart/cart-action-type";

import "./cart-item.styles.scss";

type CartItemProps = {
	cartItem: CartItems;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	return (
		<div className="cart-item-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="item-details">
				<span className="name">{name}</span>
				<span className="price">
					{quantity} * $ {price}
				</span>
			</div>
		</div>
	);
});

export default CartItem;
