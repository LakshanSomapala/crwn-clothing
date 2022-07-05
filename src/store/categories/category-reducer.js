import { CATEGORIES_ACTION_TYPES } from "./category-action-types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	//extra varibles for Thunks
	isLoading: false,
	error: null,
};

//without Thunks
// export const CategoriesReducer = (
// 	state = CATEGORIES_INITIAL_STATE,
// 	action = {}
// ) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
// 			return { ...state, categories: payload };
// 		default:
// 			return state;
// 	}
// };

//with Thunks
export const CategoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;
	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return { ...state, isLoading: true };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return { ...state, categories: payload, isLoading: false };
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return { ...state, error: payload, isLoading: false };
		default:
			return state;
	}
};
