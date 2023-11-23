import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";

import logoutIcon from '../../assets/protected-header-logout-icon.png'
import userIcon from '../../assets/common-landing-page-login-icon.png'

import '../../component_styles/protected_header.css';

export const MainProtectedHeader = () => {

    const { signOut } = useContext(AuthAccountsContext);

    return (
        <>
        
            <header className='protected-header'>

                <div className='localizase-logo'>
                    <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                </div>
                
                <div className="buttons-and-sections">
                    <button onClick={() => signOut()}>
                        Sair
                        <img src={logoutIcon} className='icon' alt="Ícone"/>
                    </button>  

                    <button className="highlighted-button" onClick={() => signOut()}>
                        Perfil
                        <img src={userIcon} className='icon' alt="Ícone"/>
                    </button>  
                </div>
                
            </header>
        
        </>
    )
}