import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in-form.component";
import './authentication.styles.scss'

const Authentication = () => {
    return (
        <div className="autentication-container">
            <SignInForm> </SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authentication;