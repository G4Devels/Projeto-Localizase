import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./index";
import { MainHome } from "../components/home_page/main_home";
import { MainLogin } from "../components/login_page/main_login";
import { MainTest } from "../components/test_page/main_test";
import MainRegistration from "../components/registration_page/main_registration";
import { MainLanding } from "../components/landing_page/main_landing_page";
import { ProtectedContainer } from "../components/protectedContainer";
import { CommonContainer } from "../components/commonContainer";
import { ForgotPassword } from "../components/forgotPassword/forgotPassword"
import { Error_404 } from "../components/error_404_page/error_404"
import { LocalDetail } from "../components/local_detail/main_local_detail";

export const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={ <CommonContainer> <MainLanding/> </CommonContainer> } />
                <Route path="/login" element={ <MainLogin/> } />
                <Route path="/registro" element={ <MainRegistration/> }/>

                <Route element={<PrivateRoutes />}>
                    <Route path="/test" element={ <ProtectedContainer> <MainTest/> </ProtectedContainer> } />
                    <Route path="/home" element={ <ProtectedContainer> <MainHome/> </ProtectedContainer> } />
                    <Route path="/localdetail/:local_id" element={ <ProtectedContainer> <LocalDetail /> </ProtectedContainer> } />
                </Route>

                <Route path="/pagina_nao_encontrada" element={ <Error_404/> }/>
                <Route path="*" element={<Navigate to="/pagina_nao_encontrada" replace/>}/>
            </Routes>

        </BrowserRouter>
    );
};