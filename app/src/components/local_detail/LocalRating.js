import '../../component_styles/local_rating.css'
import { StarRating } from './star-rating'

export const LocalRating = ({starIndexes, selectedIndex, setSelectedIndex}) => {


    return (
        <div className='local-rating'>

            <h1>3.3</h1>

            <div className='rating-data'>

                <section className='star-section'>
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