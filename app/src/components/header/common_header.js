import { Link } from 'react-router-dom';
import { AuthAccountsContext } from '../../contexts/authAccounts';
import { useContext } from 'react';

import '../../component_styles/common_header.css';

export const CommonHeader = () => {

    const { signed } = useContext(AuthAccountsContext);

    return (
        <>
        
            <header className='common-header'>
                    <nav className="header-nav">
                        <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                        
                        <div className='landing-menu-section'>
                            <button className='a'>Sobre nós</button>
                            <button className='a'>Experiências</button>
                            <Link className="a" to={signed ? "/home" : "/login"}>Entrar</Link>
                        </div>

                    </nav>
            </header>    
        
        </>
    )
}