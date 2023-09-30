import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import '../../component_styles/protected_header.css';

export const MainProtectedHeader = () => {

    const { signOut } = useContext(AuthAccountsContext);

    return (
        <>
        
            <header className='protected-header'>
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                <button onClick={() => signOut()}>Sair</button>  
            </header>
        
        </>
    )
}