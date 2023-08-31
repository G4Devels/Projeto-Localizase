import '../../component_styles/login_page.css'

import {app, analytics} from '../../services/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function MainLogin () {

    function signIn(eventObj) {
        eventObj.preventDefault()

        const email = eventObj.target.elements.email.value
        const password = eventObj.target.elements.password.value

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            // Sign in error 
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>

            <div id="login" onSubmit={signIn}>
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>

                <form>
                    <h1>Login</h1>

                    <input name="email" type="email" placeholder="Digite seu e-mail" required></input>
                    <input name="password" type="password" placeholder="Digite sua senha" required></input>

                    <button type="submit">Entrar</button>
                </form>

                <a href="#registro">Não possui uma conta? Cadastrar-se</a>
            </div>

        </>
    )
}