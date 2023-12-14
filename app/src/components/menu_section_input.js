import recomendadosIcon from '../assets/home_recomendados_icon.png'
import emAltaIcon from '../assets/home_emalta_icon.png'
import salvosIcon from '../assets/home_salvos_icon.png'

export const MenuSectionInput = ({atualChoice, setChoice, choiceValue, inputName, inputIconIndex}) => {

    const Icons = [recomendadosIcon, emAltaIcon, salvosIcon]

    return (
        <div className='input_container'>
            {
                atualChoice === choiceValue ?
                <input type='radio' id={inputName} name='choice' value={inputName} onClick={() => setChoice(choiceValue)} checked/> :
                <input type='radio' id={inputName} name='choice' value={inputName} onClick={() => setChoice(choiceValue)}/>
            }
            <div className='input_content'>
                <img className='menu-section-icon' src={Icons[inputIconIndex]} alt={inputName}/>
            </div>
        </div>
    )

}