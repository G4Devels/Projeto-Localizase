import '../../component_styles/login_page.css'

export default function MainLogin () {

    function getData(eventObj) {
        eventObj.preventDefault()

        const data = {
            email: eventObj.target.elements.email.value,
            password: eventObj.target.elements.password.value
        }

        console.log(data)
    }

    return (
        <>

            <div id="login" onSubmit={getData}>
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