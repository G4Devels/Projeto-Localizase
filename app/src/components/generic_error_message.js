import '../component_styles/generic_error_message.css'

export const GenericErrorMessage = ({errorMessageData}) => {
    return (

        <div className='error-message-container'>
            <div className='error-message-content'>

                <img src={errorMessageData.img} alt='Imagem de error'></img>

                <section>
                    <h2> {errorMessageData.title} </h2>
                    <p> {errorMessageData.msg} </p>
                </section>

            </div>
        </div>

    )
}