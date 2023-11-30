import { useEffect, useState } from 'react'
import '../../component_styles/user_profile.css'
import { useFetcher } from 'react-router-dom'

export const MainUserProfile = () => {

    const [tagArray, setTagArray] = useState({
        1: 'Pet friendly', 
        2: 'Sair a noite', 
        3: 'Gastrobar', 
        4: 'Familiar', 
        5: 'Gastrobar', 
        6: 'Familiar', 
        7: 'Gastrobar', 
        8: 'Familiar'
    })

    const [name, setName] = useState('NOME')
    const [surname, setSurname] = useState('SOBRENOME')

    function updateUserImagePreview (event) {
        const fileData = event.target.files[0]
        if (fileData) {
            document.getElementById('user-profile-image').src = `${URL.createObjectURL(fileData)}` 
        }
    }

    function removeTagFromTagGroup (event) {

        setTagArray(oldValue => { 
            if (Object.keys(oldValue).length === 3)  {return oldValue}
            else { 
                let newTagArray = oldValue
                delete newTagArray[event.target.value]
                return newTagArray
            }
        })

    }

    function saveUserProfile (event) {
        
    }


    useEffect(() => {
        // TO DO: LÓGICA DE CONSUMO À API EXPRESS PARA SALVAR OS DADOS APÓS CADA MODIFICAÇÃO
    }, [name, surname, tagArray])


    return (
        <form className="user-profile" onSubmit={e => saveUserProfile(e)}>
            
            <div className="user-profile-section user-main-data">
                
                <div className='user-image-input-container'>
                    <img className='user-profile-image' id='user-profile-image'/> 
                    <input name='nome' type='file' className='user-image-input' accept='image/*' onChange={e => updateUserImagePreview(e)}/> 
                </div>
                

                <div className='input-group'>
                    <section className='input-section'>
                        <p htmlFor='user-name'>Nome</p>
                        <input type='text' value={name} id='user-name' placeholder='Digite seu nome' onChange={(e) => {e.target.value = e.target.value.toUpperCase()}} />
                    </section>

                    <section className='input-section'>
                        <p htmlFor='user-surname'>Sobrenome</p>
                        <input type='text' value={surname} id='user-surname' placeholder='Digite seu sobrenome' onChange={(e) => {e.target.value = e.target.value.toUpperCase()}}/>
                    </section>
                </div>
            </div>

            <div className="user-profile-section user-preferences">
                <p>Suas preferências</p>
                <div className='tag-group'>
                    {Object.keys(tagArray).map((index, _) => {
                        return (
                            <div key={index} className='tag-content'>
                                <button value={index} onClick={e => removeTagFromTagGroup(e)}>X</button>
                                <p>{tagArray[index]}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <button type='submit' className='submit-user-profile'>Salvar alterações</button>

        </form>
    )
}