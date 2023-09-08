import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";


export const MainHome = () => {
    const { signOut, user } = useContext(AuthAccountsContext);

    return (
        <div>
            <h1> Bem vindo {user.displayName} </h1>
            <button onClick={() => signOut()}>Logout</button>  
        </div>
    );
};

export default MainHome;