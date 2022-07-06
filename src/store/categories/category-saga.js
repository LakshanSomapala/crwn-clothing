import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import {
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
} from "./category-action";

import { CATEGORIES_ACTION_TYPES } from "./category-action-types";

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments);
		// dispatch(fetchCategoriesSuccess(categoriesArray));
		yield put(fetchCategoriesSuccess(categoriesArray)); //inside generator fun call put insted dispatch
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
		// dispatch(fetchCategoriesFailed(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(
		// if you here same call again and agin take the latest one
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories)]); // Yeild - paused everyting inside, only complete when all of it dione
}
