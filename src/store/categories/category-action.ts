import { CATEGORIES_ACTION_TYPES, Category } from "./category-action-types";
import {
	createAction,
	Action,
	ActionWithPaylod,
	withMatcher,
} from "../../utils/reducer/reducer.util";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

//Without Thunks
// export const setCategories = (categoriesArray) => {
// 	return {
// 		type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
// 		payload: categoriesArray,
// 	};
// };

// with Thunks
// export const fetchCategoriesStart = () => {
// 	return {
// 		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
// 	};
// };

// export const fetchCategoriesSuccess = (categoriesArray) => {
// 	return {
// 		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
// 		payload: categoriesArray,
// 	};
// };

// export const fetchCategoriesFailed = (error) => {
// 	return {
// 		type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
// 		payload: error,
// 	};
// };

//With TS and Thunks
export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPaylod<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;
export type FetchCategoriesFailed = ActionWithPaylod<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

export type CategoryAction =
	| FetchCategoriesStart
	| FetchCategoriesSuccess
	| FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
	// return {
	// 	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
	// };
	return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategoriesSuccess => {
		// return {
		// 	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		// 	payload: categoriesArray,
		// };
		return createAction(
			CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
			categoriesArray
		);
	}
);

export const fetchCategoriesFailed = withMatcher(
	(error: Error): FetchCategoriesFailed => {
		// return {
		// 	type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
		// 	payload: error,
		// };
		return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
	}
);

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
