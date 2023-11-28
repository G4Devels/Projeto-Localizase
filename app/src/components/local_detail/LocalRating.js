import { useState } from 'react'
import '../../component_styles/local_rating.css'
import { StarRating } from './star-rating'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export const LocalRating = () => {
    const starIndexes = [...new Array(5).keys()].map(index => index + 1)
    const [selectedIndex, setSelectedIndex] = useState(undefined)
    console.log(selectedIndex)
    
    const sessionUser = localStorage.getItem("@AuthFirebase:user");
    const idUser = JSON.parse(sessionUser)
    const local_id = useParams()

    async function postAssessment (){

        await axios.post('http://localhost:5000/postcoments', {
            
            "uid": idUser.uid,
            "local_id": local_id.local_id,
            "comment":"",
            "note": 4,

        })
        .then(res => {
            console.log("Json enviado para api!")
        })
        .catch(error => console.log(error))
    
    }

    return (
        <div className='local-rating'>

            <h1>3.3</h1>

            <div className='rating-data'>

                <section className='star-section' onClick={postAssessment}>
                    {starIndexes.map( (index, _) => 
                        <StarRating 
                            key={index} 
                            index={index}
                            starState={index <= selectedIndex}
                            setStarState={setSelectedIndex}  
                        />
                    )}
                </section>

                <progress value={3.3 * 100/5} max="100" />
            </div>

        </div>
    )
}