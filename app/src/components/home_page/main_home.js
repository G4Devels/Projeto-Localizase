import React, { useContext, useEffect, useState } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { CardsSection } from "./cards_section";
import { MenuSection } from "./menu_section";

import { db } from "../../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; 


export const MainHome = () => {

    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);

    const [choice, setChoice] = useState(0);

    
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


    function getRecomendados () {
        return recomendados
    }


    function getEmAlta () {
        return emAlta
    }

    function getSalvos (userUID) {
        
        const docRef = doc(db, "users", userUID);
        let savedLocations = []

        getDoc(docRef)
        .then( result => {

                if (result.exists()) {
                    savedLocations = result.data().saved;
                } else {
                    console.log("No such document!");
                }
            }
        )
        .catch(error => console.log(error))

        return salvos
    }


    function analyseChoice (choice) {
        if (choice == 0) {
            const receivedData = getRecomendados()
            return <CardsSection locations={receivedData}/>
        }

        else if (choice == 1) {
            const receivedData = getEmAlta()
            return <CardsSection locations={receivedData}/>
        }

        else {
            const receivedData = getSalvos(userObject.uid)
            return <CardsSection locations={receivedData}/>
        }
    }


    return (
        <>
            <MenuSection setChoice={setChoice}/>

            {
                analyseChoice(choice)
            }

        </>
    );
};
