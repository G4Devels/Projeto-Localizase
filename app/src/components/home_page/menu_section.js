import '../../component_styles/menu_section.css';

export const MenuSection = ( {setChoice} ) => {

    return (

        <div className="menu_section">

            <div className='input_container'>
                <input type='radio' id='recomendado' name='choice' value='recomendado' onClick={() => setChoice(0)}/>
                <div className='input_content'> <label htmlFor='recomendado'>Recomendado</label> </div>
            </div>
        
            <div className='input_container'>
                <input type='radio' id='em_alta' name='choice' value='em_alta' onClick={() => setChoice(1)}/>
                <div className='input_content'> <label htmlFor='em_alta'>Em alta</label> </div>
            </div>

            <div className='input_container'>
                <input type='radio' id='salvos' name='choice' value='salvos' onClick={() => setChoice(2)}/>
                <div className='input_content'> <label htmlFor='salvos'>Salvos</label> </div>
            </div>

        </div>

    )
}