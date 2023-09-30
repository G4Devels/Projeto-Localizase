import { MainFooter } from "./footer/main_footer"
import { MainProtectedHeader } from "./header/protected_header"

export const ProtectedContainer = (props) => {
    return (
        <div className='mainContent'>
        
            <MainProtectedHeader/>

            <div className='mainContainer'>
                {props.children}
            </div>

            <MainFooter/>

        </div>
    )
}