import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
	selectCategoryMap,
	selectCategoriesIsLoading,
} from "../../store/categories/category-selector";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

// import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
	const { category } = useParams(); //use setted value for routing
	// const { categories } = useContext(CategoriesContext);

	//Redux state management
	// const categories = useSelector((state) => state.categories.categoriesMap); //move code to seperate file for optimization
	const categories = useSelector(selectCategoryMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState(categories[category]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<Fragment>
			<h1 className="category-title">{category.toUpperCase()}</h1>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="category-container">
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} products={product} />
						))}
				</div>
			)}
		</Fragment>
	);
};

export default Category;
