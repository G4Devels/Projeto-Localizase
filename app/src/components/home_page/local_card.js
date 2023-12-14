import { useEffect, useState } from 'react';
import '../../component_styles/local_card.css';

import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 

import locationIcon from '../../assets/localpin-icon.svg';
import descriptionIcon from '../../assets/description-icon.svg';

export const LocalCard = ( {cardData} ) => {
    return(

        <div className='card' onClick={() => window.location.assign( `/localdetail/${cardData.local_ID}`) }>
            
            <img className='card-img' src={cardData.img} alt="Imagem do card"></img>

            <i>
                <p>{cardData.name}</p>
            </i>

            <div className='card-content'>
                
                <a href='#'>Ver mais</a>

                <div className="card-info">
                    <img src={locationIcon} alt="local" />
                    <p>{cardData.address}</p>
                </div>

                <div className="card-info">
                    <img src={descriptionIcon} alt="descrição" />
                    <p>{cardData.about}</p>
                </div>

            </div>

        </div>

    );
}