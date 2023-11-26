import '../../component_styles/landing_page.css';
import '../../component_styles/landing_page_about_us_section.css'
import '../../component_styles/landing_page_experience_section.css'
import '../../component_styles/landing_page_our_service_section.css'

import descubraSubsectionImg from '../../assets/our-service-subsection-descubra.png'
import personalizacaoSubsectionImg from '../../assets/our-service-subsection-personalizacao.png'
import naSuaMaoSubsectionImg from '../../assets/our-service-subsection-na-sua-mao3.png'

import mission from '../../assets/landing-mission.png'
import values from '../../assets/landing-values.png'
import vision from '../../assets/landing-vision.png'

import user1 from '../../assets/landing-user1.png'
import user2 from '../../assets/landing-user2.png'
import user3 from '../../assets/landing-user3.png'

export const MainLanding = () => {


    return (
        
        <div className='landing-page-container'>
            
            



            <div id='#our-service-section' className='landing-main-section'>

                <div className='landing-page-subsection landing-page-subsection-board our-service-subsection'>
                    <section>
                        <h1>Descubra 💡</h1>
                        <p>Cansado de viver na mesma região? Descubra localizações na sua cidade e se divirta construindo novos momentos memoráveis.</p>
                        <img src={descubraSubsectionImg} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection1-border'></div>
                    </section>

                    <section>
                        <h1>Personalização 🖌️</h1>
                        <p>Através de um algoritmo inteligente, analisa o traço de personalidade baseado nos locais salvos ou avaliados e recomenda lugares de possível interesse.</p>
                        <img src={personalizacaoSubsectionImg} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection2-border'></div>
                    </section>

                    <section>
                        <h1>Na sua mão 📲</h1>
                        <p>Precisa de uma solução de fácil uso, mas de grande potencial? Acesse a apartir de qualquer dispositivo e encontre um novo mundo!</p>
                        <img src={naSuaMaoSubsectionImg} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection3-border'></div>
                    </section>
                </div>

            </div>





            <div id='#experiences-section' className='landing-main-section'>
                <div className='landing-page-subsection experiences-subsection'>


                    <div className='user-testimonials user1-testimonials'>
                        <img src={user1} alt='Imagem do usuário'/>

                        <div className='user-testimonials-main-content'>
                            <section>
                                <h1>Lucas Nogueira</h1>
                                <span>20 anos, estudante em psicologia</span>
                            </section>

                            <p>"Nunca mais tive problemas de tédio em um sábado a noite. Eu e meus amigos amamos a ideia e já criamos muitos momentos juntos por causa desse projeto!"</p>
                        </div>
                    </div>

                    <div className='user-testimonials user2-testimonials'>
                        <div className='user-testimonials-main-content'>
                            <section>
                                <h1>Bianca Alexandre</h1>
                                <span>53 anos, gerente de gastrobar</span>
                            </section>

                            <p>"A partir do serviço Localizase meu estabelecimento alavancou mais de 150% na receita semanal devido a facilidade de divulgação na plataforma"</p>
                        </div>

                        <img src={user2} alt='Imagem do usuário'/>
                    </div>

                    <div className='user-testimonials user3-testimonials'>
                        <img src={user3} alt='Imagem do usuário'/>

                        <div className='user-testimonials-main-content'>
                            <section>
                                <h1>Sebastião Oliveira</h1>
                                <span>45 anos, professor de história do IFCE</span>
                            </section>

                            <p>"Desde o surgimento da plataforma, consegui aumentar em quantidade e qualidade minhas aulas de campo, o que contribuiu imensamente para meus alunos"</p>
                        </div>
                    </div>


                </div>
            </div>





            <div id='#about-us-section' className='landing-main-section'>

                <div className='landing-page-subsection landing-page-subsection-board mission-values-vision-subsection'>
                    <section>
                        <h1>Missão 🎯</h1>
                        <p>A missão da G4Devs é superar os pequenos obstáculos do dia a dia e impulsionar a eficiência humana através de soluções e tecnologias inovadoras.</p>
                        <img src={mission} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection1-border'></div>
                    </section>

                    <section>
                        <h1>Valores 🏆</h1>
                        <p>A G4Devs é resumida por colaboração, adaptação e repetição. A sede de melhoria nos move e por ela trabalharemos até o fim.</p>
                        <img src={values} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection2-border'></div>
                    </section>

                    <section>
                        <h1>Visão 👀</h1>
                        <p>Ser uma empresa que intervenha na realidade e torne a vida das pessoas mais fácil, tecnológica e justa.</p>
                        <img src={vision} alt='Imagem da subseção'/>
                        <div className='subsection-border subsection3-border'></div>
                    </section>
                </div>

            </div>
        </div>

    );
};

export default MainLanding;