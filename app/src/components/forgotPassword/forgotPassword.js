import '../../component_styles/auth_page.css'

import { ToastContainer } from "react-toastify";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export const ForgotPassword = () => {


    return (
        <>
            <div id='bodyAuth'>

                <div class="auth-container">
                    <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>


                    <div className="auth">
                
                        <form >
                            <h1>Login</h1>

                            {/* <div id='insertErrorHandling'></div> */}

                            <input name="email" type="email" 
                            placeholder="Digite seu e-mail" required></input>

                            <input name="password" type="password"
                            placeholder="Digite sua senha" required></input>
                            

                            <button type="submit">Entrar</button>
                            <Link className='forgotPass'>Esqueceu a senha?</Link>
                        </form>
                    </div>
                
                </div>

            </div>

            <ToastContainer autoClose={8000}/>

        </>
    );
};

export default ForgotPassword;