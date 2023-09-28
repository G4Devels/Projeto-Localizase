import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthAccountsContext } from '../../contexts/authAccounts';

import '../../component_styles/landing_page.css'

export const MainLanding = () => {

    const { signed } = useContext(AuthAccountsContext);

    if(!signed){
        return (
            <>

                <header>
                    <nav class="nav">
                        <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                        <Link class="a" to="/login">Entrar</Link>
                    </nav>
                </header>    


                <div className='about-container'>
                    <div className='about-container-card'>
                        <section>
                            <h1>Localiza-se!!</h1>
                            <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                        </section>

                        <img src={require('./imgs/image_1.png')} alt='Imagem de demonstração'></img>
                    </div>


                    <div className='about-container-card'>
                        <section>
                            <h1>Pesquise</h1>
                            <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                        </section>

                        <img src={require('./imgs/image_2.png')} alt='Imagem de demonstração'></img>
                    </div>


                    <div className='about-container-card'>
                        <section>
                            <h1>Mais perto de Você</h1>
                            <p>Aqui você acha locais variados em Fortaleza para você explorar a cidade da melhor forma possível.</p>
                        </section>

                        <img src={require('./imgs/image_3.png')} alt='Imagem de demonstração'></img>
                    </div>
                </div>


                <footer>
                    <p>© G4Devels</p>
                    <p>g4devels@gmail.com</p>
                </footer>
                

            </>
    );
    } else {
        return (
            <Navigate to="/home"/>
        );
    }

    
};

export default MainLanding;