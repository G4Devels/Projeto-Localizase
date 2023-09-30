import { MainFooter } from "./footer/main_footer"
import { CommonHeader } from "./header/common_header"

export const CommonContainer = (props) => {
    return (
        <div className='mainContent'>
        
            <CommonHeader/>

            <div className='mainContainer'>
                {props.children}
            </div>

            <MainFooter/>

        </div>
    )
}