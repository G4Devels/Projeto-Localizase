import '../../component_styles/auth_page.css'

import { ToastContainer } from "react-toastify";
import React, { useState, useContext } from "react";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { Link } from "react-router-dom";
import { PasswordVisible } from "../passwordVisible"
import { Loader } from "../loader_component"

export const MainLogin = () => {

    const { signInGoogle, signInFacebook, signInEmailAndPassword, recoverPassword } = useContext(AuthAccountsContext);



        
    const [forgotPassHTML, setForgotPassHTML] = useState("")
    const [componentLoading, setComponentLoading] = useState(false)
    
    function navigateToRecoverPassword(event){
        event.preventDefault()
        recoverPassword(event.target[0].value)
    }

    function ForgotPassword(){
        setForgotPassHTML (
            <>
                <div className='forgotPassDivBackground'>
                    <div className='forgotPassDiv'>

                        <form onSubmit={ navigateToRecoverPassword }>

                            <i class="fi fi-br-cross" onClick={ closeForgotPassword }></i>

                            <h2> Recuperação de Senha </h2>

                            <p> Para recuperarmos sua senha, insira seu email para a verificação: </p>

                            <input name="recoverPassEmail" type="email"
                            placeholder="Digite seu e-mail" required></input>

                            <button type='submit'>Enviar</button>

                        </form>
                            
                    </div>
                </div> 
            </>
        )
    }

    function closeForgotPassword(){
        setForgotPassHTML("")
    }






    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    async function handleLoginFromGoogle(eventObj){
        await signInGoogle();
    };

    async function handleLoginFromFacebook(eventObj){
        await signInFacebook();
    };

    async function handleLoginFromEmailAndPassword(event) {
        setComponentLoading(true)
        event.preventDefault();
        await signInEmailAndPassword(email, password);
        setComponentLoading(false)
    };


    return (
        <>
            <div id='bodyAuth'>

            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css'></link>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>

                <div class="auth-container">
                    <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>


                    <div className="auth">
                
                        <form onSubmit={ handleLoginFromEmailAndPassword }>
                            <h1>Login</h1>

                            <input name="email" type="email" 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail" required></input>

                            <div className='divThePassword'>
                                <input id="wordPass" name="password" type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha" required></input>
                                <PasswordVisible element="wordPass"/>
                            </div>

                            <button type="submit">{ componentLoading ? <Loader /> : "Entrar"}</button>
                            
                        </form>

                        <button className='forgotPass' onClick={ ForgotPassword }>Esqueceu a senha?</button>

                        <div className='line'></div>

                        <p>Acessar com as redes socias</p>

                        <div className="accountsSVG">

                            <svg onClick={ handleLoginFromGoogle } xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256"><g transform="translate(-43.52,-43.52) scale(1.34,1.34)"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M16.00391,14.0625v4.20313h5.98828c-0.78125,2.54688 -2.91016,4.37109 -5.98828,4.37109c-3.66406,0 -6.63672,-2.97266 -6.63672,-6.63672c0,-3.66406 2.96875,-6.63672 6.63672,-6.63672c1.64844,0 3.15234,0.60547 4.3125,1.60156l3.09375,-3.09766c-1.95312,-1.78125 -4.55469,-2.86719 -7.40625,-2.86719c-6.07812,0 -11.00391,4.92578 -11.00391,11c0,6.07422 4.92578,11 11.00391,11c9.23438,0 11.27344,-8.63672 10.36719,-12.92187z"></path></g></g></g></svg>

                            <svg onClick={ handleLoginFromFacebook } xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256"><g transform="translate(-40.96,-40.96) scale(1.32,1.32)"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(8,8)"><path d="M16,4c-6.61557,0 -12,5.38443 -12,12c0,6.61557 5.38443,12 12,12c6.61557,0 12,-5.38443 12,-12c0,-6.61557 -5.38443,-12 -12,-12zM16,6c5.53469,0 10,4.46531 10,10c0,5.02739 -3.68832,9.16128 -8.51172,9.87891v-6.96289h2.84766l0.44727,-2.89258h-3.29492v-1.58008c0,-1.201 0.39458,-2.26758 1.51758,-2.26758h1.80469v-2.52344c-0.317,-0.043 -0.98786,-0.13672 -2.25586,-0.13672c-2.648,0 -4.19922,1.39798 -4.19922,4.58398v1.92383h-2.72266v2.89258h2.72266v6.9375c-4.74661,-0.78287 -8.35547,-4.88047 -8.35547,-9.85352c0,-5.53469 4.46531,-10 10,-10z"></path></g></g></g></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26"><path d="M 23.933594 18.945313 C 23.335938 20.269531 23.050781 20.863281 22.28125 22.03125 C 21.210938 23.667969 19.695313 25.707031 17.820313 25.71875 C 16.15625 25.734375 15.726563 24.632813 13.464844 24.652344 C 11.203125 24.660156 10.730469 25.738281 9.0625 25.722656 C 7.191406 25.707031 5.757813 23.867188 4.683594 22.238281 C 1.679688 17.664063 1.363281 12.300781 3.21875 9.449219 C 4.53125 7.425781 6.609375 6.238281 8.5625 6.238281 C 10.546875 6.238281 11.796875 7.328125 13.441406 7.328125 C 15.035156 7.328125 16.003906 6.234375 18.304688 6.234375 C 20.039063 6.234375 21.878906 7.179688 23.191406 8.816406 C 18.894531 11.167969 19.59375 17.304688 23.933594 18.945313 Z M 16.558594 4.40625 C 17.394531 3.335938 18.027344 1.820313 17.800781 0.277344 C 16.433594 0.371094 14.839844 1.242188 13.90625 2.367188 C 13.0625 3.394531 12.363281 4.921875 12.636719 6.398438 C 14.125 6.445313 15.664063 5.558594 16.558594 4.40625 Z"></path></svg>
                        </div>
                        
                        <hr />

                        <Link to="/registro"> Não possui uma conta? Cadastrar-se</Link>

                        {forgotPassHTML}

                    </div>
                
                </div>

            </div>

            <ToastContainer autoClose={8000}/>

        </>
    );
};

export default MainLogin;