import '../../component_styles/local_rating.css'
import { StarRating } from './star-rating'

export const LocalRating = ({starIndexes, selectedIndex, setSelectedIndex, averageGrade, assessmentsLocal}) => {




    return (
        <div className='local-rating'>

            <h1>{averageGrade}</h1>

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

                <p className="totalAssessments" > {assessmentsLocal} Avaliações </p>

                <progress value={averageGrade * 100/5} max="100" />
            </div>

        </div>
    )
}