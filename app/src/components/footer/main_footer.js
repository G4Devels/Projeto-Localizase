import { Link } from 'react-router-dom'

import '../../component_styles/footer.css'

import InstagramIcon from '../../assets/footer-instagram-icon.png'
import FacebookIcon from '../../assets/footer-facebook-icon.png'
import TwitterIcon from '../../assets/footer-twitter-icon.png'

export const MainFooter = () => {
    return (

        <footer>
            
            <div className='footer-section website-sections'>
                <h2>Mapa do site</h2>

                <ul>
                    <li><Link> <span>Landing</span> </Link></li>
                    <li><Link> <span>Sobre nós</span> </Link></li>
                    <li><Link> <span>Sobre nós</span> </Link></li>
                    <li><Link> <span>Nosso serviço</span> </Link></li>
                    <li><Link> <span>Experiências</span> </Link></li>
                </ul>
            </div>

            <div className='footer-section contact-us'>
                <h2>Contate-nos</h2>

                <ul>
                    <li>
                        <img src={InstagramIcon} />
                        <span>@localizase_oficial</span>
                    </li>


                    <li>
                        <img src={TwitterIcon} />
                        <span>@localizase_oficial</span>
                    </li>


                    <li>
                        <img src={FacebookIcon} />
                        <span>Localizase Oficial</span>
                    </li>
                </ul>
            </div>


            <div className='footer-section legal'>
                <h2>Legal</h2>

                <ul>
                    <li> <span>g4devels@gmail.com</span> </li>
                    <li><Link> <span>Política e privacidade</span> </Link></li>
                    <li> <span>© G4Devels</span> </li>
                </ul>
            </div>
            
        </footer>

    )
}