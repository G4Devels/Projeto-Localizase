import "../../component_styles/test_page.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";


export const MainTest = () => {

    /* const redirect = useNavigate();
    
    const { createUserInEmailAndPassword } = useContext(AuthAccountsContext);

    async function createUser(eventObj){
        eventObj.preventDefault();
        const name = eventObj.target.elements.name.value;
        const email = eventObj.target.elements.email.value;
        const password = eventObj.target.elements.password.value;
        const password_2 = eventObj.target.elements.confirm_password.value;

        if(password === password_2){
            const userCreated = createUserInEmailAndPassword(name, email, password, password_2);
            if (!userCreated){
                redirect('/');
            };
        }else{
            console.log("As senhas não correspondem");
        };
    }; */
    
    async function saveTest(eventObj) {
        console.log('a')
    }

    return(
        <>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
            <div id="container" onSubmit={saveTest}>
                <h1>Conte-nos seus interesses...</h1>

                <form>

                    <div class="card orange">
                        <input type="checkbox" name="interesse" id="Praia"></input>
                        <label for="Praia">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div class="card green">
                        <input type="checkbox" name="interesse" id="Balada"></input>
                        <label for="Balada">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div class="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado"></input>
                        <label for="Tour guiado">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div class="card yellow">
                        <input type="checkbox" name="interesse" id="Pet friendly"></input>
                        <label for="Pet friendly">
                            <p>Pet friendly</p>
                            <i class="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div class="card orange">
                        <input type="checkbox" name="interesse" id="Praia2"></input>
                        <label for="Praia2">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div class="card green">
                        <input type="checkbox" name="interesse" id="Balada2"></input>
                        <label for="Balada2">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div class="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado2"></input>
                        <label for="Tour guiado2">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div class="card yellow">
                        <input type="checkbox" name="interesse" id="Pet friendly2"></input>
                        <label for="Pet friendly2">
                            <p>Pet friendly</p>
                            <i class="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div class="card orange">
                        <input type="checkbox" name="interesse" id="Praia3"></input>
                        <label for="Praia3">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div class="card green">
                        <input type="checkbox" name="interesse" id="Balada3"></input>
                        <label for="Balada3">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div class="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado3"></input>
                        <label for="Tour guiado3">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div class="card yellow">
                        <input type="checkbox" name="interesse" id="Pet friendly3"></input>
                        <label for="Pet friendly3">
                            <p>Pet friendly</p>
                            <i class="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div class="card orange">
                        <input type="checkbox" name="interesse" id="Praia4"></input>
                        <label for="Praia4">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div class="card green">
                        <input type="checkbox" name="interesse" id="Balada4"></input>
                        <label for="Balada4">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div class="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado4"></input>
                        <label for="Tour guiado4">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                    </div>

                </form>
                <button type="submit">Confirmar</button>

            </div>    
        </>
    );
};