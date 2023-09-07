import MainLogin from './components/login_page/main_login'
import MainRegistration from './components/registration_page/main_registration';
import { EmailAndPasswordProvider } from './contexts/authEmailAndPasswordContext';

//Alterei para testar a tela de registro, mais tarde farei as rotas

// function App() {
//   return (
//     <EmailAndPasswordProvider>
//       <MainLogin/>
//     </EmailAndPasswordProvider>
//   );
// }

function App() {
  return (
    <EmailAndPasswordProvider>
      <MainRegistration/>
    </EmailAndPasswordProvider>
  );
}

export default App;
