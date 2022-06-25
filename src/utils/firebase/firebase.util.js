import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCLWEX7GVgKvaldSGiRQLjZj7-Z2AIogDM",
    authDomain: "crwn-clothing-db-480ef.firebaseapp.com",
    projectId: "crwn-clothing-db-480ef",
    storageBucket: "crwn-clothing-db-480ef.appspot.com",
    messagingSenderId: "1056178500780",
    appId: "1:1056178500780:web:8a1ec62cb1c86d15f55b09"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

//google sign in
export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

//create user table or doc
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnaphot = await getDoc(userDocRef);

    if (!userSnaphot.exists()) {
        const { displayName, email } = userAuth;
        const cteatedAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                cteatedAt,
                ...additionalInformation // whatever comes to this object goint to overide null values, this happens because of '...' (spread operator)
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
}

//create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth, callback)
}