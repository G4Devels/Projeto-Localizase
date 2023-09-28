import { useContext, useEffect, useState } from "react";
import "../../component_styles/test_page.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

export const MainTest = () => {

    const {addUserInterests} = useContext(AuthAccountsContext);
    
    const [renderedElements, setRenderedElements] = useState(null);
    const [listInteresses, setListInteresses] = useState([]);



    useEffect(() => {
        const fetchElements = async () => {
            const elements = await AddCardTags();
            setRenderedElements(elements);
        };
        fetchElements();
    }, []);



    
    async function saveTest(eventObj) {
        console.log('a')
    }



    function valorInteresse(interesse){
        if (!listInteresses.includes(interesse)) {

            // adicionando o interesse a lista
            setListInteresses((prevState) => [...prevState, interesse]);
        } else {

            // Se ja contém na lista excluirá
            setListInteresses((prevState) => {
                const index = prevState.indexOf(interesse);
                const updatedList = [...prevState];
                updatedList.splice(index, 1);
            });
        };
    };



    async function confirmButton(e){
        e.preventDefault();
        if (listInteresses.length >= 3){
            await addUserInterests(listInteresses)
        } else {
            alert ("Escolha 3 interesses!")
        }
    }


    async function AddCardTags(){
        const collectionTags = await getDocs(collection(db, "tags"));

        let number = 0
        const listColors = ["card orange", "card green", "card pink", "card yellow"]

        const elements = collectionTags.docs.map((Tag, index) => {

            if (number < 3) {
                number += 1
            } else {
                number = 0
            };

            const tagsName = Tag.data().name;
            
            return( 
                
                <div className={listColors[number]} key={index}>
                    <input type="checkbox" name="interesse" id={tagsName} onChange={()=>{valorInteresse(Tag.id)}}></input>
                    <label htmlFor={tagsName} >
                        <p>{tagsName}</p>
                        <i className={Tag.data().icon}></i>
                    </label>
                </div>
            );
        });

        return elements;
   };

    return(
        <>
            <div id="bodyTest">

                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
                <div id="container" onSubmit={saveTest}>
                    <h1>Conte-nos seus interesses...</h1>

                    <form id="form">

                        {renderedElements}

                    </form>
                    <button className="confirm" type="submit" onClick={confirmButton}>Confirmar</button>

                </div> 

            </div>
               
        </>
    );
};

export default MainTest;