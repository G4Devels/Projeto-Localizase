import NotSelectedStarRating from '../../assets/not-selected-star-rating.png'
import SelectedStarRating from '../../assets/selected-star-rating.png'

export const StarRating = ({index, starState, setStarState}) => {
    return starState ?
    <img src={SelectedStarRating} alt='Selecionado' onClick={() => setStarState( oldState => oldState === index ? undefined : index )}/> :
    <img src={NotSelectedStarRating} alt='Desselecionado'onClick={() => setStarState( oldState => oldState === index ? undefined : index )} />
}