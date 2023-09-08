import "../../component_styles/registration_page.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig.js"


export default function MainRegistration(){
    function createUser(eventObj){
        eventObj.preventDefault()
        const name = eventObj.target.elements.name.value
        const email = eventObj.target.elements.email.value
        const password = eventObj.target.elements.password.value
        const password_2 = eventObj.target.elements.confirm_password.value

        if(password === password_2){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.displayName = name
                    console.log('foi', user)
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('foi', errorCode, errorMessage)
                  });
        }else{
            console.log("As senhas não correspondem")
        }
    }
    return(
        <>
            <div id="registration" onSubmit={createUser}>
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                <form>
                    <h1>Criar Conta</h1>

                    <input name="name" type="text" placeholder="Digite seu nome" required></input>
                    <input name="email" type="email" placeholder="Digite seu e-mail" required></input>
                    <input name="password" type="password" placeholder="Digite sua senha" required></input>
                    <input name="confirm_password" type="password" placeholder="Confirme sua senha" required></input>

                    <button type="submit">Entrar</button>
                </form>
                <a href="#registro">Já possui conta? Fazer Login</a>
            </div>    
        </>
    )
}