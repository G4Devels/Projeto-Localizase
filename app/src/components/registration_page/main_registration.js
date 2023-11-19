import "../../component_styles/auth_page.css";

import { AuthAccountsContext } from "../../contexts/authAccounts";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PasswordVisible } from "../passwordVisible";
import { Loader } from "../loader_component"


export default function MainRegistration(){
    const [componentLoading, setComponentLoading] = useState(false)
    const { createUserInEmailAndPassword } = useContext(AuthAccountsContext);

    async function createUser(eventObj){
        setComponentLoading(true)
        eventObj.preventDefault();
        const name = eventObj.target.elements.name.value;
        const email = eventObj.target.elements.email.value;
        const password = eventObj.target.elements.password.value;
        const password_2 = eventObj.target.elements.confirm_password.value;

        if(password === password_2){
            await createUserInEmailAndPassword(name, email, password, password_2);
            setComponentLoading(false)
        }else{
            toast.error('Senha menor que 6 caracteres');
            setComponentLoading(false)
            /*const insertErrorHandling = document.getElementById('insertErrorHandling');
            insertErrorHandling.textContent = 'As senhas não correspondem';
            insertErrorHandling.style.display = "block"*/
        };
    };
    
    return(
        <>
            <div id="bodyAuth">

                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>

                <div className="auth-container" onSubmit={createUser}>
                    <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>
                    
                    <div className="auth">

                    <form>
                        <h1>Criar Conta</h1>

                        {/* <div id='insertErrorHandling'></div> */}

                        <input name="name" type="text" placeholder="Digite seu nome" required></input>
                        <input name="email" type="email" placeholder="Digite seu e-mail" required></input>

                        <div className='divThePassword'>
                            <input id="wordPass" name="password" type="password" placeholder="Digite sua senha" required></input>
                            <PasswordVisible element="wordPass"/>
                        </div>
                        

                        <div className='divThePassword'>
                            <input id="wordPass2" name="confirm_password" type="password" placeholder="Confirme sua senha" required></input>
                            <PasswordVisible element="wordPass2"/>
                        </div>
                        


                        <button type="submit">{ componentLoading ? <Loader /> : "Criar"}</button>
                    </form>
                    <Link to="/login">Já possui conta? Fazer Login</Link>

                    </div>
                </div>

            </div>

            <ToastContainer autoClose={8000} />
                
        </>
    );
};
