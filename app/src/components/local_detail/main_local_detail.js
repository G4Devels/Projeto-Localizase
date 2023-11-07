import { useParams } from "react-router-dom"
import { SaveIcon } from "./save_icon"
import { LocalRating } from "./LocalRating"
import '../../component_styles/local_detail.css'
import { useState } from "react"

export const LocalDetail = () => {

    const {local_id} = useParams()
    const [savedState, setSavedState] = useState(false)

    const tagArray = ['Pet friendly', 'Sair a noite', 'Gastrobar', 'Familiar']
    const localDescription = 'Uma descrição detalhada a respeito do local para despertar interesse no usuário Lorem ipsum dolor sit amet, consectetur adipiscing elit . Uma descrição detalhada a respeito do local para despertar interesse no usuário Lorem ipsum dolor sit amet, consectetur adipiscing elit '

    return (

        <div className="local-detail">
        
            <div className="img-gradient">
                <img className='local-background-image' src="https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/floresta_bar.png?alt=media&token=3df7108e-6c8d-49f0-ac1c-82bdbedd6851&_gl=1*6895t2*_ga*MTA1NjA2MzYyLjE2OTMzMDQ5Njg.*_ga_CW55HF8NVT*MTY5NTg5OTQ1Ny4zNi4xLjE2OTU5MDIxOTEuNjAuMC4w" alt="Imagem do local"/>
            </div>
            

            <div className="content">
                <div className="main-content">
                    <section>
                        <h1>Nome do local</h1>
                        <p>XXXX, YY - Bairro ZZZZ- WW • CEP 12345-678</p>
                    </section>

                    <SaveIcon savedState={savedState} setSavedState={setSavedState}/>
                </div>


                <div className="tags-section">
                    {
                        tagArray.map((tagName, index) => <span className='tag-name' key={index}>{tagName}</span>)
                    }
                </div>


                <p className="local-description">{localDescription}</p>


                <LocalRating />
            </div>
            

        </div>

    )
}