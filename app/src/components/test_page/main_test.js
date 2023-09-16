import "../../component_styles/test_page.css";
import "https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";


export default function MainRegistration(){

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
            <div id="container" onSubmit={saveTest}>
                <h1>Conte-nos seus interesses...</h1>

                <form>

                    <div class="card orange">
                        <label for="Praia">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Praia"></input>
                    </div>
                    <div class="card green">
                        <label for="Balada">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Balada"></input>
                    </div>
                    <div class="card pink">
                        <label for="Tour guiado">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Tour guiado"></input>
                    </div>
                    <div class="card yellow">
                        <label for="Pet friendly">
                            <p>Pet friendly</p>
                            <i class="fi fi-rr-paw"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Pet friendly"></input>
                    </div>


                    <div class="card orange">
                        <label for="Praia">
                            <p>Praia</p>
                            <i class="fi fi-rr-umbrella-beach"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Praia"></input>
                    </div>
                    <div class="card green">
                        <label for="Balada">
                            <p>Balada</p>
                            <i class="fi fi-rr-cocktail"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Balada"></input>
                    </div>
                    <div class="card pink">
                        <label for="Tour guiado">
                            <p>Tour guiado</p>
                            <i class="fi fi-rr-navigation"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Tour guiado"></input>
                    </div>
                    <div class="card yellow">
                        <label for="Pet friendly">
                            <p>Pet friendly</p>
                            <i class="fi fi-rr-paw"></i>
                        </label>
                        <input type="checkbox" name="interesse" id="Pet friendly"></input>
                    </div>


                    <button type="submit">Confirmar</button>
                </form>

            </div>    
        </>
    );
};
