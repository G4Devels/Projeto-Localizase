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
import userIcon from '../../assets/common-landing-page-login-icon.png'

export const MainUserProfile = () => {

    const { auth } = useContext(AuthAccountsContext)

    const {user_id} = useParams()

    const [tagArray, setTagArray] = useState({})
    const [tagArrayUser, setTagArrayUser] = useState({})

    const [removeComponentLoading, setRemoveComponentLoading] = useState(false)

    const userData = localStorage.getItem("@AuthFirebase:user");
    const user = JSON.parse(userData)
    const [name, setName] = useState((user === null) ? null : user.displayName)

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

                        updateProfile(auth.currentUser, {
                            photoURL: url
                        })
                        const user = JSON.parse(localStorage.getItem('@AuthFirebase:user'));
                        user.photoURL = url;
                        localStorage.setItem('@AuthFirebase:user', JSON.stringify(user));

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

        axios.post('http://localhost:5000/postNewTags', {
            "userID": user_id,
            "listTags": tagArrayUser,
        })

        toast.success("Dados salvos com sucesso!")
    }


    useEffect(() => {

        (user != null && user.photoURL != undefined) ? setImageProfile(user.photoURL) : setImageProfile(null)

        axios.post('http://localhost:5000/getUserTags', {userID: user_id})
        .then(res => {
            setTagArrayUser(res.data)
        })
        .catch(error => console.log(error))
        
        axios.post(`http://localhost:5000/getTags`)
        .then(res => {
            setTagArray(res.data)
            setRemoveComponentLoading(true)
        })
        .catch(error => console.log(error))

    }, [])


    function addTagToList(tag) {
        var checkbox = document.getElementById(tag);
        if(checkbox.checked ){
            tagArrayUser.push(tag)
        }
        else {
            if (tagArrayUser.length === 3){
                toast.error("Você precisa ter 3 gostos adicionados!")
                checkbox.checked = true
            }
            else {
                for (let index = 0; index < tagArrayUser.length + 1; index++) {
                    if(tag == tagArrayUser[index]){
                        tagArrayUser.splice(index, 1)
                    }
                }
            }
        }
    }

    let number = 0
    const listColors = ["tag-content orangeP", "tag-content greenP", "tag-content pinkP", "tag-content yellowP"]

    return (
    

        <>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
            <form className="user-profile" onSubmit={e => saveUserProfile(e)}>
                
                <div className="user-profile-section user-main-data">
                    
                    <div className='user-image-input-container'>
                        <img className='user-profile-image' id='user-profile-image' src={(imageProfile === null) ? userIcon : imageProfile}/> 
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
                    <h1>Suas preferências</h1>

                    <div className='componentLoadingProfile'>
                            {!removeComponentLoading && <Loader />}
                    </div>

                    {removeComponentLoading && <div className='tag-group'>
                        {tagArray != null ? Object.keys(tagArray).map((valueT, indexT) => {

                            if (number < 3) {
                                number += 1
                            } else {
                                number = 0
                            };


                            for (let index = 0; index < (tagArrayUser.length) + 1; index++) {
                                
                                if (tagArrayUser[index] == tagArray[valueT].name){
                                    var checkbox = document.getElementById(tagArray[valueT].name);
                                    checkbox.checked = true;
                                    break
                                }
                            }
                            
                            return (
                                <div key={indexT} className={listColors[number]}>
                                    <input type="checkbox" name="interesse" id={tagArray[valueT].name} onClick={() => addTagToList(tagArray[valueT].name)}></input>
                                    <label>
                                        {/* <button value={value.name} onClick={e => removeTagFromTagGroup(e)}>X</button> */}
                                        <p>{tagArray[valueT].name}</p>
                                        <i className={tagArray[valueT].icon}></i>
                                    </label>
                                </div>
                            )
                        }) : console.log("Pois é KKKK")}
                    </div>}

                </div>

                <button type='submit' className='submit-user-profile'>Salvar alterações</button>

            </form>

            <ToastContainer/>
        </>
    )
}