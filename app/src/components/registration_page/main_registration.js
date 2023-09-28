import "../../component_styles/auth_page.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { Link } from "react-router-dom";
import { useContext } from "react";


export default function MainRegistration(){
    
    const { createUserInEmailAndPassword } = useContext(AuthAccountsContext);

    async function createUser(eventObj){
        eventObj.preventDefault();
        const name = eventObj.target.elements.name.value;
        const email = eventObj.target.elements.email.value;
        const password = eventObj.target.elements.password.value;
        const password_2 = eventObj.target.elements.confirm_password.value;

        if(password === password_2){
            await createUserInEmailAndPassword(name, email, password, password_2);
        }else{
            console.log("As senhas não correspondem");
        };
    };
    
    return(
        <>
            <div id="auth-container" onSubmit={createUser}>
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                
                <div id="auth">

                <form>
                    <h1>Criar Conta</h1>

                    <input name="name" type="text" placeholder="Digite seu nome" required></input>
                    <input name="email" type="email" placeholder="Digite seu e-mail" required></input>
                    <input name="password" type="password" placeholder="Digite sua senha" required></input>
                    <input name="confirm_password" type="password" placeholder="Confirme sua senha" required></input>

                    <button type="submit">Entrar</button>
                </form>
                <Link to="/login">Já possui conta? Fazer Login</Link>

                </div>
            </div>    
        </>
    );
};
