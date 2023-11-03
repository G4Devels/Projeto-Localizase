import { useContext, useEffect, useState } from "react";
import "../../component_styles/test_page.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";

export const MainTest = () => {

    const {addUserInterests} = useContext(AuthAccountsContext);
    
    const [renderedElements, setRenderedElements] = useState(null);
    const [listInteresses, setListInteresses] = useState([]);
    let listValues = []



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


    // function valorInteresse(interesse){
    //     if (listInteresses.includes(interesse)) {

    //         //Se ja contém na lista excluirá
    //         listInteresses.forEach((elemento, index) => {
    //             console.log('Index: ' + index + ' Value: ' + elemento);
    //             if (interesse === elemento){
    //                 listInteresses.splice(index, 1)
    //             }
    //         })

    //     } else {

    //         // adicionando o interesse a lista
    //         setListInteresses(interesse)
    //         console.log(listInteresses)
            
    //     };
    // };


    // function valorInteresse(interesse){
    //     if (!listInteresses.includes(interesse)) {

    //         // adicionando o interesse a lista
    //         setListInteresses(interesse);
    //         console.log(listInteresses)
    //     } else {

    //         // Se ja contém na lista excluirá
    //         setListInteresses(() => {

    //             const updateList = listInteresses.forEach((elemento, index) => {
    //                 console.log('Index: ' + index + ' Value: ' + elemento);
    //                 if (interesse === elemento){
    //                     listInteresses.splice(index, 1)
    //                 }
    //             })

    //             console.log(updateList)

    //             //const index = prevState.indexOf(interesse);
    //             //const updatedList = [...prevState];
    //             //updatedList.splice(index, 1);
    //             //console.log(listInteresses)
    //             //return updatedList
    //         });
    //     };
    // };

    function valorInteresse(interesse){
        if (!listValues.includes(interesse)){
            listValues.push(interesse)
        }
        else {
            listValues.forEach((elemento, index) => {
                console.log('Index: ' + index + ' Value: ' + elemento);
                if (interesse === elemento){
                    listValues.splice(index, 1)
                }
            })
        }
        console.log(listValues)
        setListInteresses(listValues)
    };



    async function confirmButton(e){
        e.preventDefault();
        if (listInteresses.length >= 3){
            await addUserInterests(listInteresses)
        } else {
            toast.error("Escolha 3 interesses!")
        }
    }


    async function AddCardTags(){
        const collectionTags = await getDocs(collection(db, "tags"));

        let number = 0
        const listColors = ["cardT orange", "cardT green", "cardT pink", "cardT yellow"]

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
            <ToastContainer autoClose={8000}/>
        </>
    );
};

export default MainTest;