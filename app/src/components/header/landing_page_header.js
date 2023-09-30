import { Link } from 'react-router-dom';
import { AuthAccountsContext } from '../../contexts/authAccounts';
import { useContext } from 'react';

import '../../component_styles/landing_page_header.css';

export const MainLandingPageHeader = () => {

        const { signed } = useContext(AuthAccountsContext);

    return (
        <>
        
            <header className='landing_page_header'>
                    <nav className="header-nav">
                        <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                        <Link className="a" to={signed ? "/home" : "/login"}>Entrar</Link>
                    </nav>
            </header>    
        
        </>
    )
}