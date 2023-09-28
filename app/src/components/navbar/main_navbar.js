import { Link, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";

import '../../component_styles/navbar.css';

export const MainNavbar = () => {

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