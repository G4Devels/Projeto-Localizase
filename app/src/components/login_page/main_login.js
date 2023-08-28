import '../../component_styles/login_page.css'

export default function MainLogin () {
    return (
        <>

            <div id="login">
                <img src={require('../../assets/localizase_logo.png')} alt="Logo do localizase"/>

                <form>
                    <h1>Login</h1>

                    <input type="email" placeholder="Digite seu e-mail" required></input>
                    <input type="password" placeholder="Digite sua senha" required></input>

                    <button type="submit">Entrar</button>
                </form>

                <a href="#registro">Não possui uma conta? Cadastrar-se</a>
            </div>

        </>
    )
}