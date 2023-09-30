import { useContext, useEffect, useState } from 'react';
import { AuthAccountsContext } from '../../contexts/authAccounts';
import { MainProtectedHeader } from './protected_header';
import { MainLandingPageHeader } from './landing_page_header';

export const MainHeader = () => {

    const { signed } = useContext(AuthAccountsContext);
    const [windowLocation, setWindowLocation] = useState(window.location.pathname)

    useEffect(() => {
        setWindowLocation(window.location.pathname)
    }, [])

    
    if (windowLocation === 'login' || windowLocation === 'registro') {
        return (<></>)
    }

    else if (signed === true) {
        return <MainLandingPageHeader />
    }

    else {
        return <MainProtectedHeader/>
    }
    
}