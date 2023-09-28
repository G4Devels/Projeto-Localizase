import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./index";
import { MainHome } from "../components/home_page/main_home";
import { MainLogin } from "../components/login_page/main_login";
//import { MainTest } from "../components/test_page/main_test";
import MainRegistration from "../components/registration_page/main_registration";
import { MainLanding } from "../components/landing_page/main_landing_page";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLanding />} />
                <Route path="/login" element={<MainLogin />} />
                <Route path="/registro" element={<MainRegistration />}/>

                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<MainHome />} />
                    {/* <Route path="/test" element={<MainTest />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};