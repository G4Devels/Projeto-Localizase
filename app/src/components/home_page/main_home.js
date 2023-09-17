import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";


export const MainHome = () => {
    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);
    const userName = userObject.displayName;
    
    return (
        <div>
            <h1> Bem vindo {userName} </h1>
            <button onClick={() => signOut()}>Logout</button>  
        </div>
    );
};

export default MainHome;