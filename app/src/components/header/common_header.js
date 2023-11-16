import { Link } from 'react-router-dom';
import { AuthAccountsContext } from '../../contexts/authAccounts';
import { useContext, useRef } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa'

import '../../component_styles/common_header.css';

export const CommonHeader = () => {

    const { signed } = useContext(AuthAccountsContext);
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive-nav')
    }

    return (
        <>
        
            <header className='common-header'>

                    <div className='common-header-content'>

                        <img className='localizase-logo' src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                            
                        <nav ref={navRef} className="header-nav">

                            <a className='nav-link-to-section' href='#about-us'>Sobre nós</a>
                            <a className='nav-link-to-section' href='#our-service'>Nosso serviço</a>
                            <a className='nav-link-to-section' href='#experience'>Experiências</a>
                            
                            <Link className="link-btn" to={signed ? "/home" : "/login"}>Entrar</Link>
                            
                            <button className='nav-btn nav-btn-close' onClick={showNavBar}>
                                <FaTimes/>
                            </button>

                        </nav>

                        <button className='nav-btn nav-btn-open' onClick={showNavBar}>
                            <FaBars/>
                        </button>

                    </div>

            </header>    
        
        </>
    )
}