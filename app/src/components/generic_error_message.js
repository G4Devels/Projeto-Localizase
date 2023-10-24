import '../../component_styles/not_saved_locations.css'
import errorCrying from '../assets/error_crying.png'

const defaultErrorMessageData = {
    img: errorCrying,
    title: 'Ainda não há nada por aqui !',
    msg: 'Antes disso, tente salvar seus lugares !'
}

export const NotSavedLocations = ({messageErrorMessageData=defaultErrorMessageData}) => {
    return (

        <div className='error-message'>
            <img src={messageData.img} alt='Imagem de error'></img>

            <section>
                <h2> {messageData.title} </h2>
                <p> {messageData.msg} </p>
            </section>
        </div>

    )
}