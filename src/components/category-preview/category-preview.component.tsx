// import { Fragment } from "react";
// import { Link } from "react-router-dom";

// import ProductCard from "../product-card/product-card.component";

// import "./category-preview.styles.scss";

// const CategoryPreview = ({ title, products }) => {
// 	return (
// 		<div className="category-preview-container">
// 			<h2>
// 				<Link to={title}>
// 					<span className="title">{title.toUpperCase()}</span>
// 				</Link>
// 			</h2>
// 			<div className="preview">
// 				{products
// 					.filter((_, idx) => idx < 4)
// 					.map((product) => {
// 						return (
// 							<ProductCard key={product.id} products={product} />

// 							// <Fragment>
// 							// 	{/* <h2>
// 							// 		<Link to={title}>
// 							// 			<span className="title">{title.toUpperCase()}</span>
// 							// 		</Link>
// 							// 	</h2> */}
// 							// 	<ProductCard key={product.id} products={product} />
// 							// </Fragment>
// 						);
// 					})}
// 			</div>
// 		</div>
// 	);
// };

// export default CategoryPreview;

//For TS
import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { CategoryItem } from "../../store/categories/category-action-types";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				<Link to={title}>
					<span className="title">{title.toUpperCase()}</span>
				</Link>
			</h2>
			<div className="preview">
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => {
						return (
							<ProductCard key={product.id} products={product} />

							// <Fragment>
							// 	{/* <h2>
							// 		<Link to={title}>
							// 			<span className="title">{title.toUpperCase()}</span>
							// 		</Link>
							// 	</h2> */}
							// 	<ProductCard key={product.id} products={product} />
							// </Fragment>
						);
					})}
			</div>
		</div>
	);
};

export default CategoryPreview;
