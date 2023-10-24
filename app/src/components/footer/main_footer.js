import { Link } from 'react-router-dom'

import '../../component_styles/footer.css'

import InstagramIcon from '../../assets/footer-instagram-icon.png'
import FacebookIcon from '../../assets/footer-facebook-icon.png'
import TwitterIcon from '../../assets/footer-twitter-icon.png'

export const MainFooter = () => {
    return (

        <footer>
            
            <div className='footer-section website-sections'>
                <p>Mapa do site</p>

                <ul>
                    <li><Link>Landing</Link></li>
                    <li><Link>Sobre nós</Link></li>
                    <li><Link>Sobre nós</Link></li>
                    <li><Link>Nosso serviço</Link></li>
                    <li><Link>Experiências</Link></li>
                </ul>
            </div>

            <div className='footer-section contact-us'>
                <p>Contate-nos</p>

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
                <p>Legal</p>

                <ul>
                    <li>g4devels@gmail.com</li>
                    <li><Link>Política e privacidade</Link></li>
                    <li>© G4Devels</li>
                </ul>
            </div>
            
        </footer>

    )
}