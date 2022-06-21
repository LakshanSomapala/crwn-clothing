import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDococ, setDoc, getDoc } from 'firebase/firestore'

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

export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnaphot = await getDoc(userDocRef);
    console.log(userSnaphot);
    console.log(userSnaphot.exists());

    if (!userSnaphot.exists()) {
        const { displayName, email } = userAuth;
        const cteatedAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                cteatedAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
}
