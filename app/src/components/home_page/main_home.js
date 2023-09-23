import React, { useContext, useEffect } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { db } from "../../services/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore"; 


export const MainHome = () => {
    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);
    const userName = userObject.displayName;

    useEffect(()=>{

        const q = query(collection(db, 'tags'));

        getDocs(q)
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
            })
        })
        .catch(error => console.log(error))


    })
    
    return (
        <div>
            <h1> Bem vindo {userName} </h1>
            <button onClick={() => signOut()}>Logout</button>  
        </div>
    );
};
