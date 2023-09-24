import { LocalCard } from "./local_card";
import '../../component_styles/cards_section.css';

export const CardSection = ( {locations} ) => {
    return(
        
        <div className="cards_section">
            
            {
                locations.map( (cardData, key) => <LocalCard key={key} cardData={cardData}/> )
            }

        </div>

    )
}