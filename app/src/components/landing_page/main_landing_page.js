import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthAccountsContext } from '../../contexts/authAccounts';

import '../../component_styles/landing_page.css'
import { MainFooter } from "../footer/main_footer";

export const MainLanding = () => {

    const { signed } = useContext(AuthAccountsContext);

    return (
        <>

            <header className='landing_page_header'>
                <nav className="header-nav">
                    <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                    <Link className="a" to={signed ? "/home" : "/login"}>Entrar</Link>
                </nav>
            </header>    


            <div className='about-container'>
                <div id='about-container-card-1' className='about-container-card'>
                    <section>
                        <h1>Localiza-se!!</h1>
                        <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                    </section>

                    <img src={require('../../assets/landing_image_1.png')} alt='Imagem de demonstração'></img>
                </div>


                <div id='about-container-card-2' className='about-container-card'>
                    <section>
                        <h1>Pesquise</h1>
                        <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                    </section>

                    <img src={require('../../assets/landing_image_2.png')} alt='Imagem de demonstração'></img>
                </div>


                <div id='about-container-card-2' className='about-container-card'>
                    <section>
                        <h1>Mais perto de Você</h1>
                        <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                    </section>

                    <img src={require('../../assets/landing_image_3.png')} alt='Imagem de demonstração'></img>
                </div>
            </div>

            <MainFooter />                

        </>
    );
};

export default MainLanding;