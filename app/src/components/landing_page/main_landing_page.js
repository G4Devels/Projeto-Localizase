import { useState } from 'react';
import '../../component_styles/landing_page.css';
import { AboutUs } from './about_us';
import { OurService } from './our_service';
import { Experiences } from './experiences';
import { MenuSection } from '../menu_section';
import { MenuSectionInput } from '../menu_section_input' 

import '../../component_styles/landing_page_about_us_section.css'
import whoAre from '../../assets/landing-who-are.png'

export const MainLanding = () => {

    const [landingPageMenuSection, setLandingPageMenuSection] = useState(0)
    const sectionsComponents = [<AboutUs />, <OurService />, <Experiences />]

    return (
        
        <div className='landing-page-content'>

            <div className='linhaLanding'></div>
            
            {/* <MenuSection>
                <MenuSectionInput choiceValue={0} inputName={'Sobre nós'} setChoice={setLandingPageMenuSection} />
                <MenuSectionInput choiceValue={1} inputName={'Nosso serviço'} setChoice={setLandingPageMenuSection} />
                <MenuSectionInput choiceValue={2} inputName={'Experiências'} setChoice={setLandingPageMenuSection} />
            </MenuSection> */}

            
            
            
            <div id='#about-us-container' className='landing-container'>


                <div className='landing-page-content-section about-us-section'>
                    <h1>G4 Devels</h1>

                    <section>
                        <img src={whoAre}/>

                        <p>Apesar de ser jovem e modesta, sua equipe é unida por uma missão ousada
                        de inovação e progresso, indo além das limitações convencionais para criar 
                        um impacto positivo no mundo</p>
                    </section>
                </div>


                <div className='landing-page-content-section mission-values-vision-section'>
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

            <div id='#our-service-container' className='landing-container'>
        
            </div>

            <div id='#experiences-container' className='landing-container'>
                
            </div>


        </div>

    );
};

export default MainLanding;