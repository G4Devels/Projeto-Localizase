import React, { useContext, useEffect, useState } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { CardsSection } from "./cards_section";
import { MenuSection } from "../menu_section";
import axios from 'axios'

import '../../component_styles/main_home.css'

import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 
import { MainFooter } from "../footer/main_footer";
import { MainNavbar, MainProtectedHeader } from "../header/protected_header";
import { MenuSectionInput } from "../menu_section_input";


export const MainHome = () => {


    const recomendados = [
        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },

        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },
        
        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },
    ] 

    const emAlta = [
        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },
        
        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },
    ]
    
    const salvos = [
        {
            'about': 'O Centro Dragão do Mar de Arte e Cultura (CDMAC) é um centro cultural, um dos maiores do Brasil, localizado em Fortaleza, Ceará. São 30 mil metros quadrados de área dedicada à arte e à cultura, com atrações como o Museu da Cultura Cearense, o Museu de Arte Contemporânea do Ceará, Planetário Rubens de Azevedo, Teatro Dragão do Mar, Salas do Cinema do Dragão, Anfiteatro Sérgio Mota, Espaço Rogaciano Leite Filho, Biblioteca Leonilson, Auditório, Multigalerias e espaços para exposições itinerantes e a Praça Verde, que abriga mais de quatro mil pessoas e também grandes shows nacionais e internacionais.',
            'address': 'R. Dragão do Mar, 81 - Praia de Iracema, Fortaleza - CE, 60060-390',
            'img': 'https://firebasestorage.googleapis.com/v0/b/localizase-b0c83.appspot.com/o/dragao_do_mar.png?alt=media&token=6c05b490-48fc-425c-9229-fc240a088fc0',
            'name': 'Centro Dragão do Mar de Arte e Cultura',
            'tags': ['gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura', 'gratuito', 'arte', 'cultura']
        },
    ]


    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);

    const [choice, setChoice] = useState(0);

    const [locationsData, setLocationsData] = useState([])


    async function getDocData (collection, document) {
        const docSavedLocationsRef = doc(db, collection, document);
        const data = await getDoc(docSavedLocationsRef)

        return data.data()
    }
    



    function analyseChoice (choice) {
        if (choice === 0) {
            getRecomendados()
        }

        else if (choice === 1) {
            getEmAlta()
        }

        else {
            getSalvos(userObject.uid)
        }
    }


    function getRecomendados () {

        axios.post('http://localhost:5000/getrecomendados', {userID: userObject.uid})
        .then(res => {
            setLocationsData(res.data)
        })
        .catch(error => console.log(error))

    }


    const  getEmAlta = async () => {
        /*const baseURL = "http://localhost:5000/getemalta"
        axios.get(baseURL).then( async (response) => {
            setPost(response.data);
            console.log(response.data)
            setLocationsData(response.data)
          }).catch((error)=>{
            if (error.response && error.response.status === 404) {
                console.log('Recurso não encontrado');
              } else {
                console.error('Erro desconhecido:', error);
              }
          })
        setLocationsData(emAlta)
        if (!post) return null;

        return (
          <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        );*/
    }

    async function getSalvos (userUID) {

        
        const userDocument = await getDocData(`users`, userUID)
        const savedDocumentReferencesObject = userDocument.saved
        let savedDocumentReferencesObjectKeys = null

        if (savedDocumentReferencesObject !== undefined) {
            savedDocumentReferencesObjectKeys = Object.keys(savedDocumentReferencesObject)
        }
        else {
            return setLocationsData(null)
        }
        

        const locationsID = savedDocumentReferencesObjectKeys.map( (key, index) => {
            const locationPath = savedDocumentReferencesObject[key]['_key']['path']['segments']
            const locationID = locationPath[locationPath.length - 1]

            return locationID
        })

        const locationsPromisses = locationsID.map((locationID, key) => {
            return getDocData('locations', locationID)
        })

        Promise.all(locationsPromisses)
        .then((locationsPromise)=>{

            const loadedLocationsData = locationsPromise.map( result => result )
            setLocationsData(loadedLocationsData)

        })
        .catch(error => console.log(error))


    }


    useEffect(() => {
        analyseChoice(choice)
    }, [choice])


    return (
        <>

            <div className="home">
                <MenuSection>
                    <MenuSectionInput choiceValue={0} inputName={'Recomendados'} setChoice={setChoice} inputIconIndex={0}/>
                    <MenuSectionInput choiceValue={1} inputName={'Em alta'} setChoice={setChoice} inputIconIndex={1}/>
                    <MenuSectionInput choiceValue={2} inputName={'Salvos'} setChoice={setChoice} inputIconIndex={2}/>
                </MenuSection>

                <CardsSection locations={locationsData}/>
            </div> 
            
        </>
    );
};
