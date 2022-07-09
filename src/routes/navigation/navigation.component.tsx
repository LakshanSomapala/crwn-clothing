import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";

import { selectIsCartOpen } from "../../store/cart/cart-selector";
// import { UserContex } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart.context";
import { signOutStart } from "../../store/user/user-action";

// import { signOutUser } from "../../utils/firebase/firebase.util";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
	const dispatch = useDispatch();
	//Redux state management
	// const currentUser = useSelector((state) => state.user.currentUser);
	const currentUser = useSelector(selectCurrentUser);

	//using cotext provider state mangemnt
	// const { currentUser } = useContext(UserContex); //get the current user value
	const isCartOpen = useSelector(selectIsCartOpen);
	// const { isCartOpen } = useContext(CartContext);

	//For Saga

	const signOutUser = () => dispatch(signOutStart());

	return (
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
					<CartIcon></CartIcon>
				</div>
				{isCartOpen && <CartDropdown />}
				{/* if isCartOpen true and returned card dropdown true show dropdown */}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
