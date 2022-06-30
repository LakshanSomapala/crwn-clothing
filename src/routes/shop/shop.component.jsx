import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";

const Shop = () => {
	return (
		<Routes>
			{/* // parent is 'shop/' */}
			<Route index element={<CategoriesPreview />}></Route>
			<Route path=":category" element={<Category />}></Route>
			{/* setting the dynamic parameter for navigation, ':' use for access that value from anywhere */}
		</Routes>
	);
};

export default Shop;
