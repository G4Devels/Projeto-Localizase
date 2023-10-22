import { LocalCard } from "./local_card";
import '../../component_styles/cards_section.css';

export const CardsSection = ( {locations} ) => {

    if (locations != null || locations != undefined) {
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

            <div className="cards_section">

                <h6> Você não possui locais salvos! </h6>
                
            </div>

        )
    }
    
    
}