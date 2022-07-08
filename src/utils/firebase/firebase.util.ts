import { Category } from "../../store/categories/category-action-types";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCLWEX7GVgKvaldSGiRQLjZj7-Z2AIogDM",
	authDomain: "crwn-clothing-db-480ef.firebaseapp.com",
	projectId: "crwn-clothing-db-480ef",
	storageBucket: "crwn-clothing-db-480ef.appspot.com",
	messagingSenderId: "1056178500780",
	appId: "1:1056178500780:web:8a1ec62cb1c86d15f55b09",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

//google sign in
export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);

// create connection to db
export const db = getFirestore();

// //add data to db using shopdata.js file. Only need to calll one time only to create table in db
// export const addCollectionAndDocument = async (collectionName, objectToAdd) => {
// 	const collectionRef = collection(db, collectionName);
// 	const batch = writeBatch(db);

// 	objectToAdd.forEach((object) => {
// 		const docRef = doc(collectionRef, object.title.toLowerCase());
// 		batch.set(docRef, object);
// 	});

// 	await batch.commit();
// };

// export const getCategoriesAndDocuments = async () => {
// 	const collectionRef = collection(db, "category");
// 	const q = query(collectionRef);

// 	const querySnapshot = await getDocs(q); //return all the docs (tables ) under category
// 	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
// 	// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
// 	// 	//docSnapshot is the table inside the categoty collection
// 	// 	const { items, title } = docSnapshot.data();
// 	// 	acc[title.toLowerCase()] = items;
// 	// 	return acc;
// 	// }, {});

// 	// return categoryMap;
// };

// //create user table or doc
// export const createUserDocumentFromAuth = async (
// 	userAuth,
// 	additionalInformation = {}
// ) => {
// 	if (!userAuth) return;

// 	const userDocRef = doc(db, "users", userAuth.uid);

// 	const userSnaphot = await getDoc(userDocRef);

// 	if (!userSnaphot.exists()) {
// 		const { displayName, email } = userAuth;
// 		const cteatedAt = new Date();

// 		try {
// 			await setDoc(userDocRef, {
// 				displayName,
// 				email,
// 				cteatedAt,
// 				...additionalInformation, // whatever comes to this object goint to overide null values, this happens because of '...' (spread operator)
// 			});
// 		} catch (error) {
// 			console.log("error creating the user", error.message);
// 		}
// 	}
// 	return userSnaphot;
// };

// //create user with email and password
// export const createAuthUserWithEmailAndPassword = async (email, password) => {
// 	if (!email || !password) return;

// 	return await createUserWithEmailAndPassword(auth, email, password);
// };

// // sign in with email and password
// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
// 	if (!email || !password) return;

// 	return await signInWithEmailAndPassword(auth, email, password);
// };

// export const signOutUser = async () => await signOut(auth);

// //call in App,js before Saga
// export const onAuthStateChangedListner = (callback) => {
// 	onAuthStateChanged(auth, callback);
// };

// //for use in Sagqa
// export const getCurrentUser = () => {
// 	return new Promise((resolve, reject) => {
// 		const unsubscribe = onAuthStateChanged(
// 			auth,
// 			(userAuth) => {
// 				unsubscribe();
// 				resolve(userAuth);
// 			},
// 			reject
// 		);
// 	});
// };

//For TS
//add data to db using shopdata.js file. Only need to calll one time only to create table in db
export type objectToAdd = {
	title: string;
};

export const addCollectionAndDocument = async <T extends objectToAdd>(
	collectionName: string,
	objectToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionName);
	const batch = writeBatch(db);

	objectToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "category");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q); //return all the docs (tables ) under category
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
	// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
	// 	//docSnapshot is the table inside the categoty collection
	// 	const { items, title } = docSnapshot.data();
	// 	acc[title.toLowerCase()] = items;
	// 	return acc;
	// }, {});

	// return categoryMap;
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	cteatedAt: Date;
	displayName: string;
	email: string;
};

//create user table or doc
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnaphot = await getDoc(userDocRef);

	if (!userSnaphot.exists()) {
		const { displayName, email } = userAuth;
		const cteatedAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				cteatedAt,
				...additionalInformation, // whatever comes to this object goint to overide null values, this happens because of '...' (spread operator)
			});
		} catch (error) {
			console.log("error creating the user", error);
		}
	}
	return userSnaphot as QueryDocumentSnapshot<UserData>;
};

//create user with email and password
export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//call in App,js before Saga
export const onAuthStateChangedListner = (callback: NextOrObserver<User>) => {
	onAuthStateChanged(auth, callback);
};

//for use in Sagqa
export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
