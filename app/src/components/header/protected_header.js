import React, { useContext, useState } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";

import logoutIcon from '../../assets/protected-header-logout-icon.png'
import userIcon from '../../assets/common-landing-page-login-icon.png'
import homeIcon from '../../assets/protected-header-home-icon.png'

import '../../component_styles/protected_header.css';

import logo2 from "../../assets/logo_colorida.png"
import logo from "../../assets/logo_branca.png"
import { Link, Navigate } from "react-router-dom";

export const MainProtectedHeader = () => {

    const { signOut } = useContext(AuthAccountsContext);
    const [imageSrc, setImageSrc] = useState(logo)

    const userData = localStorage.getItem("@AuthFirebase:user");
    const user = JSON.parse(userData)

    

    return (
        <>
        
            <header className='protected-header'>

                <Link to='/' ><img className='localizase-logo' src={ imageSrc } onMouseOver={() => setImageSrc( logo2 )} onMouseOut={() => setImageSrc( logo )} alt="Imagem"></img></Link>
                
                <div className="buttons-and-sections">
                    <button className="linkButton" onClick={() => { window.location.href = '/home'} }>
                        Home
                        <img src={homeIcon} className='icon' alt="Ícone"/>
                    </button>  

                    <button className="linkButton" onClick={() => signOut()}>
                        Sair
                        <img src={logoutIcon} className='icon' alt="Ícone"/>
                    </button>  

                    <button className="highlighted-button" onClick={() => window.location.assign( `/userprofile/${user.uid}`) }>
                            Perfil
                        <img src={(user != null && user.photoURL != undefined) ? user.photoURL : userIcon} className='icon' alt="Ícone"/>
                    </button>  
                    
                </div>
                
            </header>
        
        </>
    )
}