import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
	key: "root",
	storage: storage,
	// backlist: ["user"], //which reducers you DON'T want to presist
	whiteList: ["cart"], // which reducer you WANT to persist
};

const sagaMiddleware = createSagaMiddleware();

const presistedReducer = persistReducer(persistConfig, rootReducer);

// For Saga
const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	sagaMiddleware,
].filter(Boolean); // add logger to middleware, show logger only in dev mode, production mode no logger

// For Thunks
// const middleWares = [
// 	process.env.NODE_ENV !== "production" && logger,
// 	thunk,
// ].filter(Boolean); // add logger to middleware, show logger only in dev mode, production mode no logger

//to use Redux dev tools in Chrome
const composedEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// const composedEnhancers = compose(applyMiddleware(...middleWares)); //to work middleware
// //spread the middleware in case have more middlewares like [logger, middleware1, middleware3, ...]

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares)); //to work middleware,
//attached Redux devtool compose
//spread the middleware in case have more middlewares like [logger, middleware1, middleware3, ...]

export const Store = createStore(
	presistedReducer,
	undefined,
	composedEnhancers
);

//After store instansiate, tell the Saga middleware to run
sagaMiddleware.run(rootSaga);

export const presistor = persistStore(Store);
