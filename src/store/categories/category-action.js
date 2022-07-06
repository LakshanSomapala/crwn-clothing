import { CATEGORIES_ACTION_TYPES } from "./category-action-types";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

//Without Thunks
// export const setCategories = (categoriesArray) => {
// 	return {
// 		type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
// 		payload: categoriesArray,
// 	};
// };

// with Thunks
export const fetchCategoriesStart = () => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
	};
};

export const fetchCategoriesSuccess = (categoriesArray) => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		payload: categoriesArray,
	};
};

export const fetchCategoriesFailed = (error) => {
	return {
		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
		payload: error,
	};
};

//Only if you using Thunks
// export const fetchCategoriesAsync = () => async (dispatch) => {
// 	dispatch(fetchCategoriesStart());
// 	try {
// 		const categoriesArray = await getCategoriesAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categoriesArray));
// 	} catch (error) {
// 		dispatch(fetchCategoriesFailed(error));
// 	}
// };
