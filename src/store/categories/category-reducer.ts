import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPES, Category } from "./category-action-types";
import {
	CategoryAction,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from "./category-action";

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

// export const CATEGORIES_INITIAL_STATE: CategoryState = {
// 	categories: [],
// 	//extra varibles for Thunks
// 	isLoading: false,
// 	error: null,
// };

// export const CategoriesReducer = (
// 	state = CATEGORIES_INITIAL_STATE,
// 	action = {}
// ) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
// 			return { ...state, isLoading: true };
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
// 			return { ...state, categories: payload, isLoading: false };
// 		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
// 			return { ...state, error: payload, isLoading: false };
// 		default:
// 			return state;
// 	}
// };

//with TS and Thunks
export type CategoryState = {
	readonly categories: Category[]; //cannot modify value, only read
	//extra varibles for Thunks
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
	categories: [],
	//extra varibles for Thunks
	isLoading: false,
	error: null,
};

export const CategoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	// action = {} as CategoryAction //action define as CategoryAction
	// action = {} as AnyAction //action define as CategoryAction
	action: AnyAction //action define as CategoryAction
): CategoryState => {
	// // const { type } = action;
	// switch (action.type) {
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
	// 		return { ...state, isLoading: true }; //when calling success TS knows this comes WITHOUT payload alone with type
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
	// 		return { ...state, categories: action.payload, isLoading: false }; //when calling success TS knows this comes WITH payload alone with type
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
	// 		return { ...state, error: action.payload, isLoading: false };
	// 	default:
	// 		return state;
	// }

	//with type safe gaurd
	if (fetchCategoriesStart.match(action)) {
		return { ...state, isLoading: true }; //when calling success TS knows this comes WITHOUT payload alone with type
	}
	if (fetchCategoriesSuccess.match(action)) {
		return { ...state, categories: action.payload, isLoading: false }; //when calling success TS knows this comes WITH payload alone with type
	}
	if (fetchCategoriesFailed.match(action)) {
		return { ...state, error: action.payload, isLoading: false };
	}
	return state;
};
