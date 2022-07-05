import { useContext } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import {
	selectCategoryMap,
	selectCategoriesIsLoading,
} from "../../store/categories/category-selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
	// const { categories } = useContext(CategoriesContext);
	//Redux state managment
	const categories = useSelector(selectCategoryMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	// const categories = useSelector((state) => state.categories.categoriesMap);
	return (
		<div className="shop-container">
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categories).map((title) => {
					const products = categories[title];
					return (
						<CategoryPreview key={title} title={title} products={products} />
					);
				})
			)}
		</div>
	);
};

export default CategoriesPreview;
