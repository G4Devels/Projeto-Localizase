import SavedIconNotSelected from '../../assets/not-selected-saved-icon.png'
import SavedIconSelected from '../../assets/selected-saved-icon.png'

import '../../component_styles/save_icon.css'

export const SaveIcon = ({savedState, setSavedState}) => {
    return savedState ? 
    <img className='save-icon' src={SavedIconSelected} onClick={(() => setSavedState(false))} alt='Salvo'/> : 
    <img className='save-icon' src={SavedIconNotSelected} onClick={() => setSavedState(true)} alt='Não salvo'/>
}