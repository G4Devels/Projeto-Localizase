import '../../component_styles/landing_page_about_us_section.css'

import whoAre1 from '../../assets/landing-who-are-1.png'
import whoAre2 from '../../assets/landing-who-are-2.png'
import ourMission1 from '../../assets/landing-our-mission-1.png'
import ourMission2 from '../../assets/landing-our-mission-2.png'
import ourValues from '../../assets/landing-our-values.png'
import ourVision from '../../assets/landing-our-vision.png'

export const AboutUs = () => {
    return (

        <div className='about-container'>
            
            <div className='about-sections whoAre'>
                <h1>Sobre nós</h1>

                <section>
                    <img src={whoAre1}/>

                    <p>A G4Devels é uma empresa desenvolvedora de software em busca de aumentar a sua eficiência diária.
                    Criada apenas em agosto de 2023, esta jovem empresa busca implementar seus sonhos, não somos grandes,
                    não somos ricos, somos apenas teimosos agora e sempre.</p>
                </section>

                <section>
                    <p>Nossos colaboradores entendem e abraçam nossa missão de fazer o mundo melhor, não se limitando à
                     ideias pré-concebidas ou qualquer tipo de crança limitante. Somos fortes, somos ousados, somos devels.</p>

                     <img src={whoAre2}/>
                </section>
            </div>


            <div className='about-sections mission'>
                <h1>Nossa missão</h1>

                <section>    
                    <img src={ourMission1}/>

                    <p>Apesar da complexidade e inevitabilidade dos grandes desafios da humanidade que persistentemente 
                    impactam o progresso humano em várias áreas, é importante ressaltar que não são apenas esses problemas
                    que causam as maiores perdas em nossa vida diária.</p>
                </section>

                <section>   
                    <p>São, na verdade, os pequenos obstáculos, desvios e atrasos que acabam se revelando os verdadeiros
                    inibidores do avanço. Na G4Devs, nossa missão é impulsionar a eficiência humana e criar oportunidades 
                    para aprimorar o seu desempenho, através do desenvolvimento de tecnologias inovadoras.</p>
                
                    <img src={ourMission2}/>
                </section>
            </div>


            <div className='about-sections values'>
                <h1>Nossos valores</h1>

                <section>
                    <img src={ourValues}/>
                    
                    <p>A G4Devs é resumida por colaboração, adaptação e repetição. A sede de melhoria nos move e por ela trabalharemos até o fim.</p>
                </section>
            </div>  


            <div className='about-sections vision'>
                <h1>Nossa visão</h1>

                <section>
                    <p>Ser uma empresa que intervenha na realidade e torne a vida das pessoas mais fácil, tecnológica e justa.</p>
                    
                    <img src={ourVision}/>
                </section>
            </div>

        </div>

    )
}