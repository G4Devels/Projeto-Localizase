import {createContext, useState} from 'react'
import {app, analytics} from '../services/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const EmailAndPasswordContext = createContext()

export const EmailAndPasswordProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const auth = getAuth(app);

    const signInEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setUser(userCredential.user)
            sessionStorage.setItem('@AuthFirebase.user', JSON.stringify(user))
        })
        .catch((error) => {
            // Sign in error 
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
    
    return (
        <EmailAndPasswordContext.Provider value={{signInEmailAndPassword, user}}>
            {children}
        </EmailAndPasswordContext.Provider>
    )
}