import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Navigate } from "react-router-dom";


export const MainHome = () => {
    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);
    const userName = userObject.displayName;
    
    return (
        <div>
            <h1> Bem vindo {userName} </h1>
            <p>Interesses: </p>
            <p id="tags"></p>
            <button onClick={() => signOut()}>Logout</button>  
        </div>
    );
    
};

export default MainHome;