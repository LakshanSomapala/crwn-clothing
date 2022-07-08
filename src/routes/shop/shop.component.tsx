import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { setCategories } from "../../store/categories/category-action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import { fetchCategoriesAsync } from "../../store/categories/category-action";
import { fetchCategoriesStart } from "../../store/categories/category-action";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util.js";

import "./shop.styles.scss";

const Shop = () => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	const getCategoriesMap = async () => {
	// 		const categoriesArray = await getCategoriesAndDocuments();
	// 		dispatch(setCategories(categoriesArray));
	// 	};
	// 	getCategoriesMap();
	// }, []);

	//using Thunks
	// useEffect(() => {
	// 	dispatch(fetchCategoriesAsync());
	// }, []);

	//using Saga
	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, []);

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
