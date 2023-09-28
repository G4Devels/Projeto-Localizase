import '../../component_styles/landing_page.css'
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthAccountsContext } from '../../contexts/authAccounts';

export const MainLanding = () => {

    const { signed } = useContext(AuthAccountsContext);

    if(!signed){
        return (
        <header>
            <div class="nav">
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                <Link class="a" to="/login">Entrar</Link>
            </div>
        </header>
    );
    } else {
        return (
            <Navigate to="/home"/>
        );
    }

    
};

export default MainLanding;