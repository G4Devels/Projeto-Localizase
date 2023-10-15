import { useState } from 'react';
import '../../component_styles/landing_page.css';
import { AboutUs } from './about_us';
import { OurService } from './our_service';
import { Experiences } from './experiences';

export const MainLanding = () => {

    const [landingPageMenuSection, setLandingPageMenuSection] = useState(0)
    const sectionsComponents = [<AboutUs />, <OurService />, <Experiences />]

    return (
        
        <div className='landing-page-content'>

            <div className='landing-page-menu-section'>
                <button onClick={() => setLandingPageMenuSection(0)} >Sobre nós</button>
                <button onClick={() => setLandingPageMenuSection(1)} >Nosso serviço</button>
                <button onClick={() => setLandingPageMenuSection(2)} >Experiências</button>
            </div>

            {
                sectionsComponents[landingPageMenuSection]
            }

        </div>

    );
};

export default MainLanding;