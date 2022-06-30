import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
	const { category } = useParams(); //use setted value for routing
	const { categories } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categories[category]);

	useEffect(() => {
		setProducts(categories[category]);
	}, [category, categories]);

	return (
		<Fragment>
			<h1 className="category-title">{category.toUpperCase()}</h1>
			<div className="category-container">
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} products={product} />
					))}
			</div>
		</Fragment>
	);
};

export default Category;
