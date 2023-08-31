import '../../component_styles/login_page.css'
import { EmailAndPasswordContext } from '../../contexts/authEmailAndPasswordContext'
import { useContext } from 'react'  

export default function MainLogin () {

    const {signInEmailAndPassword, user} = useContext(EmailAndPasswordContext)
    
    function signIn(eventObj) {

        eventObj.preventDefault()

        const email = eventObj.target.elements.email.value
        const password = eventObj.target.elements.password.value

        signInEmailAndPassword(email, password)

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