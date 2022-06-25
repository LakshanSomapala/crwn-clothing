import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth  } from "../utils/firebase/firebase.util";

// as he actual value you want to access
export const UserContex = createContext({
    currentUser: null, // initial value when application start
    setCurrentUser: () => null, // empty function when begining
});

export const UserProider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    // signOutUser()

    useEffect(() => {
        const ee = onAuthStateChangedListner((user) => {
            console.log(user);
            if(user)
                createUserDocumentFromAuth(user); // if user comes crate record
            setCurrentUser(user); // set user when user signs up or signs out. so we dont need to assign user anywhere in the code but here. this will give performance boost as well by needlessly running some functions in sign-in and sign-up components.
        });

        return ee;
    }, []); // only mount when only instantiate user context (only component mount). this will unmount using return value



    return <UserContex.Provider value={value}>{children}</UserContex.Provider>
}