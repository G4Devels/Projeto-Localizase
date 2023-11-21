import { useState } from 'react';
import '../../component_styles/landing_page.css';
import { AboutUs } from './about_us';
import { OurService } from './our_service';
import { Experiences } from './experiences';
import { MenuSection } from '../menu_section';
import { MenuSectionInput } from '../menu_section_input' 

export const MainLanding = () => {

    const [landingPageMenuSection, setLandingPageMenuSection] = useState(0)
    const sectionsComponents = [<AboutUs />, <OurService />, <Experiences />]

    return (
        
        <div className='landing-page-content'>
            
            <MenuSection>
                <MenuSectionInput choiceValue={0} inputName={'Sobre nós'} setChoice={setLandingPageMenuSection} />
                <MenuSectionInput choiceValue={1} inputName={'Nosso serviço'} setChoice={setLandingPageMenuSection} />
                <MenuSectionInput choiceValue={2} inputName={'Experiências'} setChoice={setLandingPageMenuSection} />
            </MenuSection>

            {
                sectionsComponents[landingPageMenuSection]
            }

        </div>

    );
};

export default MainLanding;