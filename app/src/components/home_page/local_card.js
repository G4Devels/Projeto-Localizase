import '../../component_styles/local_card.css';

export const LocalCard = ( {cardData} ) => {

    function getTagName (tag) {
        return tag
    }

    return(

        <div className='card'>
            
            <img className='card_img' src={cardData.img} alt="Imagem do card"></img>

            <div className='card_info'>

                <section className='card_main_data'>
                    <h2>{cardData.name}</h2>
                    <p>{cardData.address}</p>
                </section>
                
                <section className='card_tags'>
                    {
                        cardData.tags.map( (tag, key) => <span key={key}> {tag} </span> )
                    }
                </section>

                <p className='card_about'> {cardData.about} </p>

            </div>

        </div>

    );
}