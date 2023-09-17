import '../../component_styles/landing_page.css'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
/* import { AuthAccountsContext } from "../../contexts/authAccounts"; */

export const MainLanding = () => {
    /* const { signOut, user } = useContext(AuthAccountsContext); */

    return (
        <header>
            <div class="nav">
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                <Link class="a" to="/">Entrar</Link>
            </div>
        </header>
    );
};

export default MainLanding;