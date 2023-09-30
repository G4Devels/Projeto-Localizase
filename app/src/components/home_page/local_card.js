import { useState } from 'react';
import '../../component_styles/local_card.css';

import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

export const LocalCard = ( {cardData} ) => {

    const [tagsName, setTagsName] = useState([])

    async function getTagName (tagData) {
        
        const tagIdPath = tagData['_key']['path']['segments']
        const tagID = tagIdPath[tagIdPath.length - 1]

        const tagDocRef = doc(db, 'tags', tagID)
        const tagContent = await getDoc(tagDocRef)

        return tagContent.data().name

    }

    const tagsNamePromisses = cardData.tags.map( (tagData, key) => getTagName(tagData) )

    Promise.all(tagsNamePromisses)
    .then(result => setTagsName(result))
    .catch(error => console.log(error))
    

    return(

        <div className='card'>
            
            <img className='card_img' src={cardData.img} alt="Imagem do card"></img>

            <div className='card_info'>

                <section className='card_main_data'>
                    <h2>{cardData.name}</h2>
                    <p className='pLocalCard'>{cardData.address}</p>
                </section>
                
                <section className='card_tags'>
                    {
                        tagsName.map( (tagName, key) => <span key={key}> {tagName} </span> )
                    }
                </section>

                <p className='card_about'> {cardData.about} </p>

            </div>

        </div>

    );
}