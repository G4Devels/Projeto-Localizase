import { LocalCard } from "./local_card";
import '../../component_styles/cards_section.css';

import {GenericErrorMessage} from "../../components/generic_error_message";
import errorCrying from '../../assets/error_crying.png'

export const CardsSection = ( {locations} ) => {
    if (locations !== null) {
        return(
        
            <div className="cards_section">
                
                {
                    locations.map( (cardData, key) => <LocalCard key={key} cardData={cardData}/> )
                }

            </div>

        )
    }
    else {
        return (
            <GenericErrorMessage errorMessageData={{img: errorCrying, title: 'Ops! Ainda não há nada por aqui...', msg: 'Um erro ocorreu ao carregar os dados.'}} />
        )
    }
    
    
}