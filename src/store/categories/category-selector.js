import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories; // get the categories slice from the entire Redux store

//Memoi selector to get categories Array from categories redux store
//gives us
export const selectCategories = createSelector(
	[selectCategoryReducer], // input selector -
	(categoriesArray) => {
		/* output selector - whatever the output we need from categories slice. In here categories array
        Eg: [selectCategoryReducer, selectCurrentUser]
	        (categories, currentUser) 
        This is only runs if the categoriesArray object changes in memory again
        */
		return categoriesArray.categories;
	}
);

//Memoi selector for mapping the array. this will runs again if the categories changes in memory. so this will prevent everytime reduce the categories array for each call.
export const selectCategoryMap = createSelector(
	[selectCategories],
	(categories) => {
		return categories.reduce((acc, category) => {
			const { items, title } = category;
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});
	}
);

//fro spinner
export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);

// export const selectCategoryMap = (state) => {
// 	return state.categories.categories;
// };
