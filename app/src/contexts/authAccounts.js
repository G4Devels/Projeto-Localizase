import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithPopup, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
const providerGoogle = new GoogleAuthProvider();

export const AuthAccountsContext = createContext({})


export const AuthAccountsProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStorageAuth = () => {
            const sessionToken = localStorage.getItem("@AuthFirebase:token");
            const sessionUser = localStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser){
                setUser(sessionUser);
            };
        };
        loadStorageAuth();
    }, []);




    
    const signInGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user)
                localStorage.setItem("@AuthFirebase:token", token);
                localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };






    const signInEmailAndPassword = (email, password) => {


// setpersistence ainda não está dando certo, ele não está persistindo no site
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            return (

                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    console.log(user)
                    localStorage.setItem('@AuthFirebase.user', JSON.stringify(user))
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                })

            );
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    }





    const createUserInEmailAndPassword = async (name, email, password, password_2) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                .then(() => {})
                .catch((error) => {});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
             });
    };
        




    async function signOut() {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }





    return (
        <AuthAccountsContext.Provider value={{ signInGoogle, signInEmailAndPassword, createUserInEmailAndPassword, signed: !!user, user, signOut }}>
            {children}
        </AuthAccountsContext.Provider>
    )

};