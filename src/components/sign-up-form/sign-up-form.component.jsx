import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";
import { UserContex  } from "../../contexts/user.context";
import FormInputs from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const refreshFormField = () => {
        setFormFields(defaultFormField);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            createUserDocumentFromAuth(user, { displayName });
            refreshFormField();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use')
                alert('cannot create user, email already in use');
            else
                console.log('user creation enconterd an error', error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target; // name and value of the FormInputs fields will come thrpough the event object when fired.

        // setFormFields({[name]: value}); // update appropriate form field when user type in, but set other formfields to undifie. correct way is below

        setFormFields({ ...formFields, [name]: value }) //update appropriate form field when user type in, but other fields does not change. remain their previous value
    }

    return (
        <div className="sign-up-container">
            <h2>Don't hava an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInputs
                    label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName} />

                <FormInputs
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email} />

                <FormInputs
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password} />

                <FormInputs
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword} />

                <Button type='submit' >Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
