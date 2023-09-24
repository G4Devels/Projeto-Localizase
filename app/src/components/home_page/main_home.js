import React, { useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";


export const MainHome = () => {
    const { signOut } = useContext(AuthAccountsContext);

    const user = localStorage.getItem("@AuthFirebase:user")
    const userObject = JSON.parse(user);
    const userName = userObject.displayName;
    
    async function buscaDados() {

        const querySnapshot = await getDocs(collection(db, "tags"));      // coleção de tags
        const docRef = doc(db, "users", userObject.uid);  // coleção de tags que o usuraio tem
        const docSnap = await getDoc(docRef);   // pegando (GET) as tags que o usuario tem
        var listNameTags = []   
        var number = 0

        if (docSnap.exists()) {
            var docTags = docSnap.data().tags; // os ID's das tags do usuario

            docTags.forEach((x) => {         // o for vai percorrer cada tag que o usuario tem

                querySnapshot.forEach((doc) => {  // esse outro for vai percorrer as tags existentes no banco de dados

                    var docIdString = "/tags/"+doc.id  // coloquei o "/tags/" pq o id das tags existentes do banco de dados
                                                       // estava sem e os ID's das tags do usuatio estava com o "/tags/"
                                                       // adicionei pq quando igualasse os dois sempre ia dar diferente.

                    if(docTags[number] == docIdString){  // Aqui eu comparando os dois ID's do banco de dados e os do usuario

                        listNameTags.push(doc.data().name)  // Se fosse iguais eu adicionava o nome, respectivo ao ID na lista listName, 
                                                            // para depois adicionar no HTML
                    };
                });
                number += 1
            });
            document.getElementById("tags").innerHTML = listNameTags
        } else {
            console.log("No such document!");
        }

        console.log(number)
    }
    buscaDados()
    
    return (
        <div>
            <h1> Bem vindo {userName} </h1>
            <p>Interesses: </p>
            <p id="tags"></p>
            <button onClick={() => signOut()}>Logout</button>  
        </div>
    );
};

export default MainHome;