import { Link } from 'react-router-dom';
import { AuthAccountsContext } from '../../contexts/authAccounts';
import { useContext, useEffect, useRef, useState } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';

import backgroundImg_1 from '../../assets/common_header_background_1.jpg' ;
import backgroundImg_2 from '../../assets/common_header_background_2.jpg' ;
import backgroundImg_3 from '../../assets/common_header_background_3.jpg' ;

import aboutUsIcon from '../../assets/common-landing-page-about-us-icon.png'
import experienceIcon from '../../assets/common-landing-page-experiences-icon.png'
import loginIcon from '../../assets/common-landing-page-login-icon.png'
import ourServiceIcon from '../../assets/common-landing-page-our-service-icon.png'


import '../../component_styles/common_header.css';
import logo2 from "../../assets/logo_colorida.png"
import logo from "../../assets/logo_branca.png"

export const CommonHeader = () => {

    const userData = localStorage.getItem("@AuthFirebase:user");
    const user = JSON.parse(userData)

    const { signed } = useContext(AuthAccountsContext);
    const navRef = useRef();
    
    const [currentBackgroundimageState, setCurrentBackgroundimageState] = useState(0)
    const [imageSrc, setImageSrc] = useState(logo)

    const backgroundContent = [
        {
            img: backgroundImg_1,
            description: 'Vai, aonde te levar a alma, Na senda que teu coração decidir. Desfruta da jornada, encontra prazeres, Pois a vida é uma aventura a prosseguir.',
            local_name: 'Theatro José de Alencar'
        },
        {
            img: backgroundImg_2,
            description: 'Na efêmera dança do tempo a passar, Explorar lugares, corações abraçar. Em cada encontro, a vida a pulsar, Surpresas no amanhã, a nos encantar.',
            local_name: 'Beira mar' 
        },
        {
            img: backgroundImg_3,
            description: 'Em Fortaleza, no calor que arde a alma, Cultura em versos, um canto que embalsama. Pelas esquinas, histórias a tecer, Você inspira, a cidade a renascer.',
            local_name: 'Biblioteca Pública Estadual do Ceará' 
        },
    ]

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive-nav')
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(currentBackgroundimageState===2) {
                setCurrentBackgroundimageState(0)
            }
            else {
                setCurrentBackgroundimageState(currentBackgroundimageState + 1)
            }
        }, 10000)

        return () => clearTimeout(timer)
    })

    return (
        <>
        
            <header className='common-header' style={{ backgroundImage: `url(${ backgroundContent[currentBackgroundimageState].img })` }}>

                <div className='common-header-content'>

                    <Link to='/'><img className='localizase-logo' src={ imageSrc } onMouseOver={() => setImageSrc( logo2 )} onMouseOut={() => setImageSrc( logo )} alt="Imagem"></img></Link>
                        
                    <nav ref={navRef} className="header-nav">

                        <a className='nav-link-to-section' href='#our-service-section' onClick={ () => document.getElementById('#our-service-section').scrollIntoView({behavior:'smooth'}) }>
                            Nosso serviço
                            <img className='section-icons' src={ourServiceIcon} alt='�cone'/>
                        </a>
                        
                        <a className='nav-link-to-section' href='#experiences-section' onClick={ () => document.getElementById('#experiences-section').scrollIntoView({behavior:'smooth'}) }>
                            Experiências
                            <img className='section-icons' src={experienceIcon} alt='�cone'/>
                        </a>

                        <a className='nav-link-to-section' href='#about-us-section' onClick={ () => document.getElementById('#about-us-section').scrollIntoView({behavior:'smooth'}) }>
                            Sobre nós
                            <img className='section-icons' src={aboutUsIcon} alt='�cone'/>
                        </a>
                        
                        <Link className="link-btn" to={signed ? "/home" : "/login"}>
                            Entrar
                            <img src={(user != null && user.photoURL != undefined) ? user.photoURL : loginIcon} className='icon' alt="Ícone"/>
                        </Link>
                        
                        <button className='nav-btn nav-btn-close' onClick={showNavBar}>
                            <FaTimes/>
                        </button>

                    </nav>

                    <button className='nav-btn nav-btn-open' onClick={showNavBar}>
                        <FaBars/>
                    </button>

                </div>


                <blockquote>
                    {backgroundContent[currentBackgroundimageState].description}
                    <hr />
                    {backgroundContent[currentBackgroundimageState].local_name}
                </blockquote>

            </header>
            
        
        </>
    )
}