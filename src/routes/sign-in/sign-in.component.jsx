import { SignInWithGooglePopup } from "../../utils/firebase/firebase.util";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await SignInWithGooglePopup();
        createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <button onClick={logGoogleUser}>
                Sign In Page
            </button>
        </div>
    )
}

export default SignIn;