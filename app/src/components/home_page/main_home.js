import React, { useContext, useEffect, useState } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { CardSection } from "./cards_section";
import { MenuSection } from "./menu_section";


export const MainHome = () => {

    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);
    const userName = userObject.displayName;

    const [choice, setChoice] = useState(0);

    const locations = [
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
    

    function analyseChoice (choice) {
        if (choice == 0) {
            return 'Recomendado'
        }

        else if (choice == 1) {
            return 'Em alta'
        }

        else {
            return 'Salvos'
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
