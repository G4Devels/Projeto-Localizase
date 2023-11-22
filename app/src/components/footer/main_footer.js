import { Link } from 'react-router-dom'

import logo2 from "../../assets/logo_colorida.png"
import logo from "../../assets/logo_branca.png"

import '../../component_styles/footer.css'
import { useState } from 'react'

export const MainFooter = () => {

    const [imageSrc, setImageSrc] = useState(logo)


    return (

        <footer>
            
            <div className='footer-section website-sections'>
                <h2>Mapa do site</h2>

                <ul>
                    <li><Link> <span className='span'>Landing</span> </Link></li>
                    <li><Link> <span className='span'>Sobre nós</span> </Link></li>
                    <li><Link> <span className='span'>Nosso serviço</span> </Link></li>
                    <li><Link> <span className='span'>Experiências</span> </Link></li>
                </ul>
            </div>

            <div className='footer-section socialMidia'>
                <h2>Mídias Sociais</h2>

                <ul>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0,0,256,256">
                        <g transform=""><g fill="#012034" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M16.5,5c-6.33361,0 -11.5,5.16639 -11.5,11.5v15c0,6.33276 5.16621,11.5 11.5,11.5h15c6.33294,0 11.5,-5.16706 11.5,-11.5v-15c0,-6.33379 -5.16724,-11.5 -11.5,-11.5zM16.5,8h15c4.71124,0 8.5,3.78779 8.5,8.5v15c0,4.71106 -3.78894,8.5 -8.5,8.5h-15c-4.71221,0 -8.5,-3.78876 -8.5,-8.5v-15c0,-4.71239 3.78761,-8.5 8.5,-8.5zM34,12c-1.105,0 -2,0.895 -2,2c0,1.105 0.895,2 2,2c1.105,0 2,-0.895 2,-2c0,-1.105 -0.895,-2 -2,-2zM24,14c-5.50482,0 -10,4.49518 -10,10c0,5.50482 4.49518,10 10,10c5.50482,0 10,-4.49518 10,-10c0,-5.50482 -4.49518,-10 -10,-10zM24,17c3.88318,0 7,3.11682 7,7c0,3.88318 -3.11682,7 -7,7c-3.88318,0 -7,-3.11682 -7,-7c0,-3.88318 3.11682,-7 7,-7z"></path></g></g></g>
                        </svg>
                    </li>

                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0,0,256,256">
                        <g fill="#012034" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M11.5,6c-3.01977,0 -5.5,2.48023 -5.5,5.5v25c0,3.01977 2.48023,5.5 5.5,5.5h25c3.01977,0 5.5,-2.48023 5.5,-5.5v-25c0,-3.01977 -2.48023,-5.5 -5.5,-5.5zM11.5,9h25c1.39823,0 2.5,1.10177 2.5,2.5v25c0,1.39823 -1.10177,2.5 -2.5,2.5h-6.5v-10h3.625c0.504,0 0.93019,-0.37695 0.99219,-0.87695l0.375,-3c0.036,-0.284 -0.05414,-0.56916 -0.24414,-0.78516c-0.189,-0.215 -0.46105,-0.33789 -0.74805,-0.33789h-4v-3.5c0,-1.103 0.897,-2 2,-2h2c0.552,0 1,-0.447 1,-1v-3.375c0,-0.518 -0.39516,-0.95009 -0.91016,-0.99609c-0.059,-0.005 -1.46986,-0.12891 -3.25586,-0.12891c-4.407,0 -6.83398,2.61619 -6.83398,7.36719v3.63281h-4c-0.552,0 -1,0.447 -1,1v3c0,0.553 0.448,1 1,1h4v10h-12.5c-1.39823,0 -2.5,-1.10177 -2.5,-2.5v-25c0,-1.39823 1.10177,-2.5 2.5,-2.5z"></path></g></g>
                        </svg>
                    </li>

                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0,0,256,256">
                        <g fill="#012034" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.33333,5.33333)"><path d="M12.5,6c-3.57194,0 -6.5,2.92806 -6.5,6.5v23c0,3.57194 2.92806,6.5 6.5,6.5h23c3.57194,0 6.5,-2.92806 6.5,-6.5v-23c0,-3.57194 -2.92806,-6.5 -6.5,-6.5zM12.5,9h23c1.95006,0 3.5,1.54994 3.5,3.5v23c0,1.95006 -1.54994,3.5 -3.5,3.5h-23c-1.95006,0 -3.5,-1.54994 -3.5,-3.5v-23c0,-1.95006 1.54994,-3.5 3.5,-3.5zM13.82813,14l7.73633,11.05664l-7.74219,8.94336h2.04297l6.60352,-7.64844l5.35156,7.64844h6.4375l-8.23242,-11.76562l7.11133,-8.23437h-2l-6.01367,6.94336l-4.85742,-6.94336zM16.93555,15.69531h2.5625l11.65234,16.60938h-2.5625z"></path></g></g>
                        </svg>
                    </li>
                </ul>
            </div>

            <div className='footer-section contact'>
                <h2>Atendimento</h2>

                <ul>
                    <li> <span className='span'>Segunda a sexta-feira, das 8h às 17h.</span> </li>
                    <li> <span className='span'>Rua Fictícia, 123, Cidade Fictícia, Estado Fictício, CEP 12345-678.</span></li>
                    <li> <span className='span'>(00) 1234-5678.</span> </li>
                    <li> <span className='span'>g4devels@gmail.com</span> </li>
                </ul>
            </div>

            <div className='linha'></div>

            <Link to='/' className='logoLink'><img className='logo' src={ imageSrc } onMouseOver={() => setImageSrc( logo2 )} onMouseOut={() => setImageSrc( logo )} alt="Imagem"></img></Link>

            

            <div className='dark'>
                <ul className='listPolitic'>
                    <li><Link> <span className='span'>Condições de Uso</span> </Link></li>
                    <li>|</li>
                    <li><Link> <span className='span'>Política</span> </Link></li>
                    <li>|</li>
                    <li><Link> <span className='span'>Privacidade</span> </Link></li>
                    <li>|</li>
                    <li><Link> <span className='span'>Cookies</span> </Link></li>
                </ul>
                <p>© 2023-2023 G4Devels</p>
            </div>

            
            
        </footer>

    )
}