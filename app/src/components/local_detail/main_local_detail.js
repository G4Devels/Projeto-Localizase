import { useParams } from "react-router-dom"
import { SaveIcon } from "./save_icon"
import { LocalRating } from "./LocalRating"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import { db } from "../../services/firebaseConfig"
import axios from 'axios'
import '../../component_styles/local_detail.css'
import { collection, doc, getDoc } from "firebase/firestore"

export const LocalDetail = () => {

    const {local_id} = useParams()
    const [localData, setLocalData] = useState(null)

    const [savedState, setSavedState] = useState(false)
    const starIndexes = [...new Array(5).keys()].map(index => index + 1)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [tagArray, setTagArray] = useState(['Pet friendly', 'Sair a noite', 'Gastrobar', 'Familiar'])
    const [carouselImgs, setCarouselImgs] = useState(null)

    const carousel = useRef()
    const [width, setWidth] = useState(0)

    const [noteUserOfBD, setNoteUserOfBD] = useState(null)

    const userData = localStorage.getItem("@AuthFirebase:user");
    const userID = JSON.parse(userData)

    useEffect(() => {
        noteBD()

        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)

        axios.post(`http://localhost:5000/localdetail`, {local_ID: local_id})
        .then(res => {
            setLocalData(res.data)
            console.log(res.data)
            setCarouselImgs(res.data.carousel_imgs)

            axios.post(`http://localhost:5000/getTagArray`, {tag_reference_array: res.data.tags})
            .then(res => {
                setTagArray(res.data)
            })
            .catch(error => console.log(error))

        })
        .catch(error => console.log(error))

        if (selectedIndex >= 1){
            axios.post('http://localhost:5000/postcoments', {
                "uid": userID.uid, 
                "local_id": local_id, 
                "comment": "", 
                "note": selectedIndex,
            })
        }

    }, [selectedIndex, savedState])


    async function noteBD (){   
        const collectionsUsers = doc(db, 'users', userID.uid);
        const collectionsAssessmentsOfUsers = doc(collectionsUsers, 'assessments', local_id);
        const docAssessments =  await getDoc(collectionsAssessmentsOfUsers);

        if (docAssessments.exists) {
            const noteUser = docAssessments.data().note;
            setNoteUserOfBD(noteUser)
        }
    }

    

    

    return localData === null ? null : (

        <div className="local-detail">

            <div className="content">

                <div className="img-gradient">
                    <img className='local-background-image' src={localData.img} alt="Imagem do local"/>
                </div>

                <div className="main-content">
                    <section>
                        <h1>{localData.name}</h1>
                        <p>{localData.address}</p>
                    </section>
                    
                    <form onChange={(e) => {e.preventDefault(); console.log('oi')}} className="get-and-show-statistics">
                        <LocalRating selectedIndex={(selectedIndex === null) ? noteUserOfBD : selectedIndex } setSelectedIndex={setSelectedIndex} starIndexes={starIndexes} />
                        <SaveIcon savedState={savedState} setSavedState={setSavedState}/>
                    </form>
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
                            <p className="local-description">{localData.about}</p>
                        </section>

                        <section>
                            <h1>Horário de funcionamento</h1>
                            <p className="local-description">{localData.schedule}</p>
                        </section>  

                        <section>
                            <h1>Contato</h1>
                            <p className="local-description">{localData.contact}</p>
                        </section>

                    </section>
                    

                    <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>

                        <motion.div className="inner-carousel"
                        onDrag={()=>{console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)}}
                            drag="x"
                            dragConstraints={{right: 0, left: -width}}
                        >
                            {
                                carouselImgs.map((imgSrc, index) => <img key={index} className='local-carrosel-image' src={imgSrc} alt="Imagem do carrosel"/> )
                            }
                        </motion.div>

                    </motion.div>
                    

                </div>
                
                
                <div className="local-map">
                    <iframe src={localData.google_maps_API} width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>


            </div>
            
        </div>

    )
}