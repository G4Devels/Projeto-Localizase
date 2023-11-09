import '../../component_styles/error_404.css';
import mapa from '../../assets/mapa.svg';

export const Error_404 = () => {
    return (
        <>
        
            <body class="divError" >
                <div class="sectionError" >
                    <div class="left" >
                        <h1 class="titleError" >404</h1>
                        <p class="textError" >Ops! Parece que você se perdeu pelo caminho.</p>
                        <a class="linkFromErrorToHome" href="/">Clique aqui para voltar a página principal</a>
                    </div>

                    <img src={ mapa } alt="mapa"/>
                
                </div>
            </body>
        
        </>
    )
}