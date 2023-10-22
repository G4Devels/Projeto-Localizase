import { useState } from 'react';
import '../../component_styles/local_card.css';

import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

import locationIcon from '../../assets/localpin-icon.svg';
import descriptionIcon from '../../assets/description-icon.svg';

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
            
            <img className='card-img' src={cardData.img} alt="Imagem do card"></img>

            <i>
                <p>{cardData.name}</p>
            </i>

            <div className='card-content'>
                
                <a href='#'>Ver mais</a>

                <div class="card-info">
                    <img src={locationIcon} alt="local" />
                    <p>Av. Alberto Nepomuceno, 1 - Centro, Fortaleza - CE, 60055-000</p>
                </div>

                <div class="card-info">
                    <img src={descriptionIcon} alt="descrição" />
                    <p>Majestosa catedral católica de estilo gótico, com vitrais coloridos e uma arquitetura impressionante.</p>
                </div>

            </div>

        </div>

    );
}