import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, browserLocalPersistence, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, setPersistence, signInWithPopup, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
const providerGoogle = new GoogleAuthProvider();

export const AuthAccountsContext = createContext({})

export const AuthAccountsProvider = ({ children }) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
         const loadStorageAuth = async () => {
            const sessionToken = localStorage.getItem("@AuthFirebase:token");
            const sessionUser = localStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser){
                setUser(sessionUser);
            };
        };
        loadStorageAuth();
    }, []);




    
    const signInGoogle = async () => {
        await signInWithPopup(auth, providerGoogle)
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






    const signInEmailAndPassword = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const token = user.accessToken
            setUser(user);
            localStorage.setItem("@AuthFirebase:token", token);
            localStorage.setItem("@AuthFirebase:user", JSON.stringify(user))
        })
        .catch((error) => {
            const errorCode = error.code.toString();
            const errorMessage = error.message.toString();
            console.log("[",errorCode,"]", errorMessage);
            renderError(errorCode);
        })
    };




    

    const createUserInEmailAndPassword = async (name, email, password, password_2) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                .then(() => {})
                .catch((error) => {});
                window.location.href = "/"
            })
            .catch((error) => {
                const errorCode = error.code.toString();
                const errorMessage = error.message.toString();
                console.log("[",errorCode,"]", errorMessage);
             });
    };
        




    async function signOut() {
        localStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }



    function renderError(errorCode){
        if (errorCode === "auth/user-not-found"){
            window.alert("Usuário não cadastrado no sistema");
        }else if(errorCode === "auth/email-already-in-use"){
            window.alert("Já existe um usuário com esse email");
        }else if(errorCode === "auth/weak-password"){
            window.alert("Digite uma senha com pelo menos 6 caracteres");
        }else if(errorCode === "auth/wrong-password"){
            window.alert("Senha incorreta");
        };
    }



    return (
        <AuthAccountsContext.Provider value={{ signInGoogle, signInEmailAndPassword, createUserInEmailAndPassword, signed: !!user, user, signOut, auth}}>
            {children}
        </AuthAccountsContext.Provider>
    )

};