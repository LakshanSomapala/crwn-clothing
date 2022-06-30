import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
	categories: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categories, setCategories] = useState({});
	const value = { categories };

	useEffect(() => {
		const categoryMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategories(categoryMap);
		};
		categoryMap();
	}, []);

	//Only need to call one time for entire application to create the table inside the db. table already in the db
	// useEffect(() => {
	// 	addCollectionAndDocument("category", SHOP_DATA);
	// }, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
