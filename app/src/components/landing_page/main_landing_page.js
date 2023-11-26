import '../../component_styles/landing_page.css';
import '../../component_styles/landing_page_about_us_section.css'

import whoAre from '../../assets/landing-who-are.png'

import descubraSubsectionImg from '../../assets/our-service-subsection-descubra.png'
import personalizacaoSubsectionImg from '../../assets/our-service-subsection-personalizacao.png'
import naSuaMaoSubsectionImg from '../../assets/our-service-subsection-na-sua-mao3.png'

export const MainLanding = () => {


    return (
        
        <div className='landing-page-container'>
            
            



            <div id='#our-service-section' className='landing-main-section'>

                <div className='landing-page-subsection our-service-subsection'>
                    <h1 className='landing-subsection-title'>Nosso serviço</h1>
                </div>

                <div className='landing-page-subsection our-service-subsection'>
                    <section>
                        <h1>Descubra 💡</h1>
                        <p>Cansado de viver na mesma região? Descubra localizações na sua cidade e se divirta construindo novos momentos memoráveis.</p>
                        <img src={descubraSubsectionImg} alt='Imagem da subseção'/>
                    </section>

                    <section>
                        <h1>Personalização 🖌️</h1>
                        <p>Através de um algoritmo inteligente, analisa o traço de personalidade baseado nos locais salvos ou avaliados e recomenda lugares de possível interesse.</p>
                        <img src={personalizacaoSubsectionImg} alt='Imagem da subseção'/>
                    </section>

                    <section>
                        <h1>Na sua mão 📲</h1>
                        <p>Precisa de uma solução de fácil uso, mas de grande potencial? Acesse a apartir de qualquer dispositivo e encontre um novo mundo!</p>
                        <img src={naSuaMaoSubsectionImg} alt='Imagem da subseção'/>
                    </section>
                </div>

            </div>





            <div id='#experiences-section' className='landing-main-section'>
                <div className='landing-page-subsection our-service-subsection'>
                    <h1 className='landing-subsection-title'>Experiências</h1>
                </div>
            </div>





            <div id='#about-us-section' className='landing-main-section'>
                <div className='landing-page-subsection about-us-subsection'>
                    <h1 className='landing-subsection-title'>Sobre nós</h1>

                    <section>
                        <img src={whoAre}/>

                        <p>Apesar de ser jovem e modesta, sua equipe é unida por uma missão ousada
                        de inovação e progresso, indo além das limitações convencionais para criar 
                        um impacto positivo no mundo</p>
                    </section>
                </div>


                <div className='landing-page-subsection mission-values-vision-subsection'>
                    <section>
                        <h1>Missão 🎯</h1>
                        <p>A missão da G4Devs é superar os pequenos obstáculos do dia a dia e impulsionar a eficiência humana através de soluções e tecnologias inovadoras.</p>
                    </section>

                    <section>
                        <h1>Valores 🏆</h1>
                        <p>A G4Devs é resumida por colaboração, adaptação e repetição. A sede de melhoria nos move e por ela trabalharemos até o fim.</p>
                    </section>

                    <section>
                        <h1>Visão 👀</h1>
                        <p>Ser uma empresa que intervenha na realidade e torne a vida das pessoas mais fácil, tecnológica e justa.</p>
                    </section>
                </div>
            </div>
        </div>

    );
};

export default MainLanding;