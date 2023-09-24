import { useContext } from "react";
import "../../component_styles/test_page.css";
import { AuthAccountsContext } from "../../contexts/authAccounts";

export const MainTest = () => {

    const listInteresses = []

    const {addUserInterests} = useContext(AuthAccountsContext);
    
    async function saveTest(eventObj) {
        console.log('a')
    }


    function valorInteresse(interesse){
        if (!listInteresses.includes(interesse)) {
            listInteresses.push(interesse);
          } else {
            const index = listInteresses.indexOf(interesse);
            listInteresses.splice(index, 1);
          };
        console.log(listInteresses);
    };

    async function confirm(){
        if (listInteresses.length >= 3){
            window.location.href = "/Home"
            await addUserInterests(listInteresses)
        } else {
            alert ("Escolha 3 interesses!")
        }
    }

    return(
        <>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
            <div id="container" onSubmit={saveTest}>
                <h1>Conte-nos seus interesses...</h1>

                <form>

                    <div className="card orange">
                        <input type="checkbox" name="interesse" id="Praia"></input>
                        <label htmlFor="Praia" onClick={()=>{valorInteresse("praia")}}>
                            <p>Praia</p>
                            <i className="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div className="card green">
                        <input type="checkbox" name="interesse" id="Balada"></input>
                        <label htmlFor="Balada" onClick={()=>{valorInteresse("balada")}}>
                            <p>Balada</p>
                            <i className="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div className="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado"></input>
                        <label htmlFor="Tour guiado" onClick={()=>{valorInteresse("Tour guiado")}}>
                            <p>Tour guiado</p>
                            <i className="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div className="card yellow">
                        <input type="checkbox" name="interesse" id="Pet friendly"></input>
                        <label htmlFor="Pet friendly" onClick={()=>{valorInteresse("pet friendly")}}>
                            <p>Pet friendly</p>
                            <i className="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div className="card orange">
                        <input type="checkbox" name="interesse" id="Gratuito"></input>
                        <label htmlFor="Gratuito" onClick={()=>{valorInteresse("/tags/MDGmjXbzcVkTwtB2LLmO")}}>
                            <p>Gratuito</p>
                            <i className="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div className="card green">
                        <input type="checkbox" name="interesse" id="Pago"></input>
                        <label htmlFor="Pago" onClick={()=>{valorInteresse("/tags/N0qrdOjhJyALfB4r2Xj4")}}>
                            <p>Pago</p>
                            <i className="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div className="card pink">
                        <input type="checkbox" name="interesse" id="Arte"></input>
                        <label htmlFor="Arte" onClick={()=>{valorInteresse("/tags/TFuNdnHnDtC3JbbVEKhH")}}>
                            <p>Arte</p>
                            <i className="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div className="card yellow">
                        <input type="checkbox" name="interesse" id="Cultura"></input>
                        <label htmlFor="Cultura" onClick={()=>{valorInteresse("/tags/tDNSBAlJ9IVx927yjNVB")}}>
                            <p>Cultura</p>
                            <i className="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div className="card orange">
                        <input type="checkbox" name="interesse" id="Praia3"></input>
                        <label htmlFor="Praia3" onClick={()=>{valorInteresse("Praia3")}}>
                            <p>Praia</p>
                            <i className="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div className="card green">
                        <input type="checkbox" name="interesse" id="Balada3"></input>
                        <label htmlFor="Balada3" onClick={()=>{valorInteresse("Balada3")}}>
                            <p>Balada</p>
                            <i className="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div className="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado3"></input>
                        <label htmlFor="Tour guiado3" onClick={()=>{valorInteresse("Tour guiado3")}}>
                            <p>Tour guiado</p>
                            <i className="fi fi-rr-navigation"></i>
                        </label>
                    </div>
                    <div className="card yellow">
                        <input type="checkbox" name="interesse" id="Pet friendly3"></input>
                        <label htmlFor="Pet friendly3" onClick={()=>{valorInteresse("pet friendly3")}}>
                            <p>Pet friendly</p>
                            <i className="fi fi-rr-paw"></i>
                        </label>
                    </div>


                    <div className="card orange">
                        <input type="checkbox" name="interesse" id="Praia4"></input>
                        <label htmlFor="Praia4" onClick={()=>{valorInteresse("Praia4")}}>
                            <p>Praia</p>
                            <i className="fi fi-rr-umbrella-beach"></i>
                        </label>
                    </div>
                    <div className="card green">
                        <input type="checkbox" name="interesse" id="Balada4"></input>
                        <label htmlFor="Balada4" onClick={()=>{valorInteresse("Balada4")}}>
                            <p>Balada</p>
                            <i className="fi fi-rr-cocktail"></i>
                        </label>
                    </div>
                    <div className="card pink">
                        <input type="checkbox" name="interesse" id="Tour guiado4"></input>
                        <label htmlFor="Tour guiado4" onClick={()=>{valorInteresse("Tour guiado4")}}>
                            <p>Tour guiado</p>
                            <i className="fi fi-rr-navigation"></i>
                        </label>
                    </div>

                </form>
                <button className="confirm" type="submit" onClick={confirm}>Confirmar</button>

            </div>    
        </>
    );
};