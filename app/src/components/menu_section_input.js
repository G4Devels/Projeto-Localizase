export const MenuSectionInput = ({setChoice, choiceValue, inputName}) => {
    return (
        <div className='input_container'>
            <input type='radio' id={inputName} name='choice' value={inputName} onClick={() => setChoice(choiceValue)}/>
            <div className='input_content'><label htmlFor={inputName}> {inputName} </label></div>
        </div>
    )
}