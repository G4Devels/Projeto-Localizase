import { useParams } from "react-router-dom"
import { SaveIcon } from "./save_icon"
import { LocalRating } from "./LocalRating"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import '../../component_styles/local_detail.css'

export const LocalDetail = () => {

    const {local_id} = useParams()
    const [savedState, setSavedState] = useState(false)

    const tagArray = ['Pet friendly', 'Sair a noite', 'Gastrobar', 'Familiar']
    const localDescription = 'Uma descrição detalhada a respeito do local para despertar interesse no usuário Lorem ipsum dolor sit amet, consectetur adipiscing elit . Uma descrição detalhada a respeito do local para despertar interesse no usuário Lorem ipsum dolor sit amet, consectetur adipiscing elit '
    const localBannerImg = 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w'
    const carrosselImgs = [
        'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w',
        'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w',
        'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w',
        'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w'
    ]

    const carousel = useRef()
    const [width, setWidth] = useState(0)

    useEffect(() => {
        console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    })

    return (

        <div className="local-detail">
        
            <div className="img-gradient">
                <img className='local-background-image' src={localBannerImg} alt="Imagem do local"/>
            </div>
            

            <div className="content">
                <div className="main-content">
                    <section>
                        <h1>Nome do local</h1>
                        <p>XXXX, YY - Bairro ZZZZ- WW • CEP 12345-678</p>
                    </section>
                    
                    <section className="get-and-show-statistics">
                        <LocalRating />
                        <SaveIcon savedState={savedState} setSavedState={setSavedState}/>
                    </section>
                </div>


                <div className="tags-section">
                    {
                        tagArray.map((tagName, index) => <span className='tag-name' key={index}>{tagName}</span>)
                    }
                </div>

                
                <div className="about-section">

                    <section className="about-text">
                        
                        <section>
                            <h1>Sobre</h1>
                            <p className="local-description">{localDescription}</p>
                        </section>

                        <section>
                            <h1>Horário de funcionamento</h1>
                            <p className="local-description">{localDescription}</p>
                        </section>  

                        <section>
                            <h1>Contato</h1>
                            <p className="local-description">{localDescription}</p>
                        </section>

                    </section>
                    

                    <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>

                        <motion.div className="inner-carousel"
                        onDrag={()=>{console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)}}
                            drag="x"
                            dragConstraints={{right: 0, left: -width}}
                        >
                            {
                                carrosselImgs.map((imgSrc, index) => <img key={index} className='local-carrosel-image' src={imgSrc} alt="Imagem do carrosel"/> )
                            }
                        </motion.div>

                    </motion.div>
                    

                </div>
                
                
                <div className="local-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3513980954804!2d-38.51263972768201!3d-3.733367034865065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7485e4b48ea99%3A0xeac45d29894c3e65!2sFloresta%20Bar!5e0!3m2!1spt-BR!2sbr!4v1699536317535!5m2!1spt-BR!2sbr" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>


            </div>
            
        </div>

    )
}