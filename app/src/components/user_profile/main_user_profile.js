import { useContext, useEffect, useState } from 'react'
import '../../component_styles/user_profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthAccountsContext } from "../../contexts/authAccounts"
import { updateProfile } from 'firebase/auth'
import { storage } from '../../services/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import { Loader } from "../loader_component"

export const MainUserProfile = () => {

    const { auth } = useContext(AuthAccountsContext)

    const {user_id} = useParams()

    const [tagArray, setTagArray] = useState({}
        // 1: 'Pet friendly', 
        // 2: 'Sair a noite', 
        // 3: 'Gastrobar', 
        // 4: 'Familiar', 
        // 5: 'Gastrobar', 
        // 6: 'Familiar', 
        // 7: 'Gastrobar', 
        // 8: 'Familiar'
    )

    const [removeComponentLoading, setRemoveComponentLoading] = useState(false)

    const userData = localStorage.getItem("@AuthFirebase:user");
    const user = JSON.parse(userData)
    const [name, setName] = useState(user.displayName)

    const [imageProfile, setImageProfile] = useState(null)
    const [surname, setSurname] = useState('sobrenome')

    async function updateUserImagePreview (event) {
        const fileData = event.target.files[0];

        if (fileData) {
            document.getElementById('user-profile-image').src = `${URL.createObjectURL(fileData)}` 

            fetch(URL.createObjectURL(fileData)).then((res=>res.blob())).then(async (blob)=>{

                const storageRef = ref(storage, `users_image_profile/${user.displayName}`);

                uploadBytes(storageRef, blob)
                .then((snapshot) => {

                    getDownloadURL(storageRef)
                    .then((url)=>{

                        axios.post('http://localhost:5000/postImageProfile', {
                            "userID": user_id,
                            "photoURL": url,
                        });

                    })
                    .catch((error)=> console.log(error));

                    toast.success("Foto de perfil salva com sucesso!")

                }, (error) => {
                    console.log(error);
                });
            })
            .catch((error) => console.log(error));
        };
    };



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
        event.preventDefault()
        updateProfile(auth.currentUser, {
            displayName: name
        })
        const user = JSON.parse(localStorage.getItem('@AuthFirebase:user'));
        user.displayName = name;
        localStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
        toast.success("Nome salvo com sucesso!")
    }


    useEffect(() => {

        axios.post('http://localhost:5000/getImageProfile', { 
            "userID": user.uid, 
        })
        .then(res => setImageProfile(res.data))
        .catch(error => console.log(error))
        
        axios.post(`http://localhost:5000/getUserTags`, {userID: user_id})
        .then(res => {
            setTagArray(res.data)
            setRemoveComponentLoading(true)
        })
        .catch(error => console.log(error))
    }, [])


    function setTagClass(tagClass) {
        return `tag-content ${tagClass}`
    }

    let number = 0
    const listColors = ["tag-content orangeP", "tag-content greenP", "tag-content pinkP", "tag-content yellowP"]

    return (
    

        <>
            <form className="user-profile" onSubmit={e => saveUserProfile(e)}>
                
                <div className="user-profile-section user-main-data">
                    
                    <div className='user-image-input-container'>
                        <img className='user-profile-image' id='user-profile-image' src={imageProfile}/> 
                        <input name='nome' type='file' className='user-image-input' accept='image/*' onChange={e => updateUserImagePreview(e)}/> 
                    </div>
                    

                    <div className='input-group'>
                        <section className='input-section'>
                            <p htmlFor='user-name'>Nome</p>
                            <input type='text' value={name} id='user-name' placeholder='Digite seu nome' onChange={(e) => {e.target.value = e.target.value; setName(e.target.value)}} />
                        </section>

                        <section className='input-section'>
                            <p htmlFor='user-surname'>Sobrenome</p>
                            <input type='text' value={surname} id='user-surname' placeholder='Digite seu sobrenome' onChange={(e) => {e.target.value = e.target.value; setSurname(e.target.value)}}/>
                        </section>
                    </div>
                </div>

                <div className="user-profile-section user-preferences">
                    <p>Suas preferências</p>

                    <div className='componentLoadingProfile'>
                            {!removeComponentLoading && <Loader />}
                    </div>

                    <div className='tag-group'>
                        {Object.keys(tagArray).map((value, index) => {
                            if (number < 3) {
                                number += 1
                            } else {
                                number = 0
                            };
                            return (

                                <div key={index} className={listColors[number]}>
                                    <input type="checkbox" name="interesse" id={tagArray[value].name}></input>
                                    <label>
                                        {/* <button value={value.name} onClick={e => removeTagFromTagGroup(e)}>X</button> */}
                                        {console.log(tagArray[value])}
                                        <p>{tagArray[value].name}</p>
                                    </label>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <button type='submit' className='submit-user-profile'>Salvar alterações</button>

            </form>

            <ToastContainer/>
        </>
    )
}