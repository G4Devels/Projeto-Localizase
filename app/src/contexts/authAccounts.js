import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { app, db } from "../services/firebaseConfig";

import 'react-toastify/dist/ReactToastify.min.css'
import { toast } from "react-toastify";
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



    async function readDataUser(tagToCheck){
        const ifExistsTag = query(collection(db, "users"), where("tags", "!=", null));

        const querySnapshot = await getDocs(ifExistsTag);
        let thereIsATagOnTheUser = false

        querySnapshot.forEach((doc) => {
            const user = doc.id
            console.log(user)
            if ((tagToCheck).includes(user)){
                thereIsATagOnTheUser = true
                window.location.href = "/home"
            }
        });
        if (!thereIsATagOnTheUser){
            window.location.href = "/test"
        }
    }



    
    const signInGoogle = async () => {
        await signInWithPopup(auth, providerGoogle)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user)
                localStorage.setItem("@AuthFirebase:token", token);
                localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                readDataUser(auth.currentUser.uid)
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
            if(!auth.currentUser.emailVerified){
                toast.error("verifique seu email!")
                return
            }
            const user = userCredential.user;
            const token = user.accessToken
            setUser(user);
            localStorage.setItem("@AuthFirebase:token", token);
            localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            readDataUser(auth.currentUser.uid)
        })
        .catch((error) => {
            console.log(email)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("[",errorCode,"]", errorMessage);
            RenderError(errorCode);
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

                sendEmailVerification(auth.currentUser)
                

                .then(()=>{
                    toast.success("foi enviado um email de verificação para " + email, {
                        autoClose: 5000,
                        hideProgressBar: true,
                    })
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 3000);
                })
                
            })
            .catch((error) => {
                const errorCode = error.code.toString();
                const errorMessage = error.message.toString();
                console.log("[",errorCode,"]", errorMessage);
                RenderError(errorCode);
             });
    };




    const addUserInterests = async (lista) => {
        console.log("entrou em adicionado ao firebase")
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            tags: lista
        }).then(() => {
            window.location.href = "/home"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    };
        




    async function signOut() {
        localStorage.clear();
        setUser(null);
        window.location.href = "/"
    }




    function recoverPassword(email){
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            toast.success("foi enviado um email de verificação para " + email, {
                autoClose: 5000,
                hideProgressBar: true,
            })
        })
        .catch(()=>{
            toast.error(email + " não cadastrado", {
                autoClose: 5000,
                hideProgressBar: true,
            })
        })
    }




    /*function RenderError(errorCode){
        const insertErrorHandling = document.getElementById('insertErrorHandling');
        if ((errorCode === "auth/user-not-found") || (errorCode === "auth/wrong-password")){
            insertErrorHandling.textContent = 'Email ou Senha incorreto';
            insertErrorHandling.style.display = "block"
         
        }else if(errorCode === "auth/email-already-in-use"){
            insertErrorHandling.textContent = 'Email Já cadastrado';
            insertErrorHandling.style.display = "block"

        }else if(errorCode === "auth/weak-password"){
            insertErrorHandling.textContent = 'Senha menor que 6 caracteres';
            insertErrorHandling.style.display = "block"
        }
    }*/

    function RenderError(errorCode){
        if ((errorCode === "auth/user-not-found") || (errorCode === "auth/wrong-password")){
            toast.error('Email ou Senha incorreto');
         
        }else if(errorCode === "auth/email-already-in-use"){
            toast.error('Email Já cadastrado');

        }else if(errorCode === "auth/weak-password"){
            toast.error('Senha menor que 6 caracteres');
        }
    }



    return (
        <AuthAccountsContext.Provider value={{ signInGoogle, signInEmailAndPassword, createUserInEmailAndPassword, signed: !!user, user, signOut, auth, addUserInterests, recoverPassword}}>
            {children}
        </AuthAccountsContext.Provider>
    )

};