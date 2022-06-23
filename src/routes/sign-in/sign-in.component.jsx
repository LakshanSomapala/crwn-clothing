import { SignInWithGooglePopup } from "../../utils/firebase/firebase.util";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await SignInWithGooglePopup();
        createUserDocumentFromAuth(user);
        // console.log(response);
    }

    return (
        <div>
            <button onClick={logGoogleUser}>
                Sign In Page
            </button>
            <br/>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn;